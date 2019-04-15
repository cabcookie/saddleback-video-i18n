/**
 * Copyright 2019 Carsten Koch
 * All rights reserved.
 */

'use strict';

module.exports = function (grunt)
{
    grunt.initConfig({
        // Adding typescript (not sure if this works)
        ts: {
            default: {
                tsconfig: './tsconfig.json'
            }
        },

        // Extension debug and packaging
        cep: {
            options: require('./bundle/cep-config.js'),

            debug: {
                options: {
                    profile: 'launch',
                },
            },

            release: {
                options: {
                    profile: 'package',
                },
            },
        },
    });

    // Load grunt-cep tasks
    grunt.loadNpmTasks('grunt-cep');

    // Load grunt-ts tasks
    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask('default', ['ts']);
};
