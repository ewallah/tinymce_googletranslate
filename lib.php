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

defined('MOODLE_INTERNAL') || die();

/**
 * Plugin for Googletranslate.
 *
 * @package   tinymce_googletranslate
 * @copyright 2014 Renaat Debleu (www.eWallah.net)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class tinymce_googletranslate extends editor_tinymce_plugin {

    protected function update_init_params(array &$params, context $context, array $options = null) {
        global $OUTPUT;

        // If useers cannot grade a quiz, they don't have permission to use it
        if(!has_capability('mod/quiz:grade', $context)){
            return;
        }
        // If there is no API key provided.
        $apikey = $this->get_config('googleapikey', '');
        if ($apikey === '') {
            return;
        }

        // If there is only one language installed.
        $installedlangs = get_string_manager()->get_list_of_translations(false);
        // TODO: extra languages.
        $extralangs = $this->get_config('availlangs', '');
        $cntextra = substr_count($extralangs, ',');
        if (count($installedlangs) < 2) {
            return;
        }
        // Add button after 'image'.
        if ($row = $this->find_button($params, 'image')) {
            $this->add_button_after($params, $row, 'googletranslate', 'image');
        // If 'image' is not found, add button in the end of the last row.
        } else {
            $this->add_button_after($params, $this->count_button_rows($params), 'googletranslate');
        }
        // Add JS file, which uses default name.
        $this->add_js_plugin($params);
        $params['googletranslate_extralangs'] = json_encode($extralangs);
        $params['googletranslate_apikey'] = $apikey;

    }
}
