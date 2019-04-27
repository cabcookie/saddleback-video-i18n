module.exports =
{
    bundle: {
        version: '3.0.0',
        id: 'org.saddlebackVideoI18n',
        name: 'saddleback-video-i18n',
        author_name: 'Carsten Koch',
        description: 'A script to help translate video components from one language into another in After Effects for Saddleback Church sermons.',
        ui_access: 'You can run this extension by choosing<br><b>Window &gt; Extensions &gt; saddleback-video-i18n.</b>',
    },

    extensions: [{
        version: '3.0.0',
        type: 'Panel',
        id: 'org.saddlebackVideoI18n.panel',
        name: 'Saddleback Video i18n',
        main_path: 'saddleback-video-i18n.html',
        script_path: 'extendscript/saddleback-video-i18n.jsx',
        icons: {
            light: {
                normal: 'icons/icon-light.png',
                hover: 'icons/icon-light-hover.png',
                disabled: 'icons/icon-light-disabled.png'
            },
            dark: {
                normal: 'icons/icon-dark.png',
                hover: 'icons/icon-dark-hover.png',
                disabled: 'icons/icon-dark-disabled.png'
            },
        },
        manifest: 'bundle/manifest.extension.xml',
    }],

    builds: [
        // CC2017 and up
        {
            bundle: { manifest: 'bundle/manifest.bundle.cc2017.xml' },
            products: ["aftereffects"],
            source: 'src',
            families: ['CC2019', 'CC2018', 'CC2017'],
        },
        // Legacy versions
        {
            bundle: { manifest: 'bundle/manifest.bundle.cc.xml' },
            products: ["aftereffects"],
            source: 'src',
            families: ['CC2015.5', 'CC2015', 'CC2014', 'CC'],
        }
    ],
};
