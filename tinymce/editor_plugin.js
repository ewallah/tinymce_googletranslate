/**
 * TinyMCE plugin Google translate - provides GUI to translate text.
 *
 * Based on the example plugin (c) 2009 Moxiecode Systems AB.
 *
 * @author  2014 Renaat Debleu (www.eWallah.net)
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

(function() {
    tinymce.create('tinymce.plugins.GoogleTranslate', {

        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {

            // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceGoogleTranslate');
            ed.addCommand('mceGoogleTranslate', function() {
                lang = ed.getParam('language');
                ed.windowManager.open({
                    file : ed.getParam("moodle_plugin_base") + 'googletranslate/dialog.php?lang=' + lang ,
                    width : 800 + parseInt(ed.getLang('googletranslate.delta_width', 0)),
                    height : 400 + parseInt(ed.getLang('googletranslate.delta_height', 0)),
                    inline : 1
                }, {
                    plugin_url : url // Plugin absolute URL
                });
            });


            // Register googletranslate buttons.
            ed.addButton('googletranslate', {
                title : 'Google Translate',
                cmd : 'mceGoogleTranslate',
                image : url + '/img/googletranslate.png'
            });
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'Google Translate plugin',
                author : 'Renaat Debleu',
                authorurl : 'http://www.eWallah.net',
                infourl : 'http://moodle.org',
                version : "1.0"
            };
        }
    });

    // Register plugin.
    tinymce.PluginManager.add('googletranslate', tinymce.plugins.GoogleTranslate);
})();
