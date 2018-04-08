<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Displays the TinyMCE popup window to translate text
 *
 * @package   tinymce_googletranslate
 * @copyright 2014 Renaat Debleu (www.eWallah.net)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('NO_MOODLE_COOKIES', true); // Session not used here.

require(dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))) . '/config.php');

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/lib/editor/tinymce/plugins/googletranslate/dialog.php');

$editor = get_texteditor('tinymce');
$plugin = $editor->get_plugin('googletranslate');
$langs = get_string_manager()->get_list_of_translations();

$htmllang = get_html_lang();

header('Content-Type: text/html; charset=utf-8');
header('X-UA-Compatible: IE=edge');
?>
<!DOCTYPE html>
<html <?php echo $htmllang ?>
<head>
    <title><?php print_string('description', 'tinymce_googletranslate'); ?></title>
    <script type="text/javascript" src="<?php echo $editor->get_tinymce_base_url(); ?>/tiny_mce_popup.js"></script>
    <script type="text/javascript" src="<?php echo $plugin->get_tinymce_file_url('js/dialog.js'); ?>"></script>
</head>
<body>
    <div style="color:red; margin-bottom:4px"><?php print_string('warning', 'tinymce_googletranslate'); ?></div>
    <div style="color:blue; margin-bottom:4px"><?php print_string('paying', 'tinymce_googletranslate'); ?></div>
    <div id="iframecontainer"></div>
        <div class="mceActionPanel">
            <?php foreach ($langs as $name => $value) {
                if (strlen($name) == 2) {
                    if ($name == 'en') {
                        echo '<input type="radio" id="orilang' . $name . '" name="originallanguage" checked="checked">' . $name . '</input>';
                    } else {
                        echo '<input type="radio" id="orilang' . $name . '" name="originallanguage">' . $name . '</input>';
                    }
                }
            }?>
            <input type="radio" id="orilang" name="originallanguage"><?php print_string('other', 'moodle'); ?></input>
            <span style="float:right">Text only: <input type="checkbox" id="textonly"/>  Multilanguage Filter: <input type="checkbox" id="multifilter"/></span>
        </div>
        <div class="mceActionPanel">
            <?php  foreach ($langs as $name => $value) {
                if (strlen($name) == 2) {
                    echo '<input type="submit" id="insert" name="insert" value="' . $value .
                         '" onclick="return GoogleTranslateDialog.translateText(\'' . $name . '\');" />';
                }
            }?>
            <input type="button" id="cancel" name="cancel" value="{#cancel}" onclick="tinyMCEPopup.close();" />
        </div>
</body>
</html>
