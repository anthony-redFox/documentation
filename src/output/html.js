import path from 'path';
import mergeConfig from '../merge_config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * Formats documentation as HTML.
 *
 * @param {Array<Comment>} comments parsed comments
 * @param {Object} config Options that can customize the output
 * @param {string} [config.theme='default_theme'] Name of a module used for an HTML theme.
 * @returns {Promise<Array<Object>>} Promise with results
 * @name formats.html
 * @public
 * @example
 * var documentation = require('documentation');
 * var streamArray = require('stream-array');
 * var vfs = require('vinyl-fs');
 *
 * documentation.build(['index.js'])
 *   .then(documentation.formats.html)
 *   .then(output => {
 *     streamArray(output).pipe(vfs.dest('./output-directory'));
 *   });
 */
export default function html(comments, config) {
  if (!config) {
    config = {};
  }
  return mergeConfig(config).then(config => {
    let themePath = '../default_theme/index.cjs';
    if (config.theme) {
      themePath = path.resolve(process.cwd(), config.theme);
    }
    return require(themePath)(comments, config);
  });
}
