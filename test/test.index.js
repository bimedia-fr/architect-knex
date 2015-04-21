/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
/* 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var assert = require('assert');
var vows = require('vows');
var plugin = require('../lib/index');

vows.describe('architect-knex').addBatch({
    'create sqlite3 in memory database': {
        topic: function () {
            return plugin({settings: {
                    default: {
                        dialect: 'sqlite3',
                        connection: {
                            database: ':memory:'
                        }
                    }
                }
            },
            {},
            this.callback);
        },
        'check if we have a instance of knex named default': function (err, plugin) {
            assert.ifError(err);
            assert.isObject(plugin);
            assert.isFunction(plugin.knex.default);
        },
        'create a table "users"': function (err, plugin) {
            plugin.knex.default.schema.createTable('users', function (table) {
                table.increments();
                table.string('name');
                table.timestamps();
            });
        },
        'check if table exists': function (err, plugin) {
            plugin.knex.default.schema.hasTable('users').then(function (exists) {
                assert.isTrue(exists);
            });
        }
    }
}).exportTo(module);

