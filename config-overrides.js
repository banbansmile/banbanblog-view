const path = require('path')
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');

const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addWebpackModuleRule,
    addWebpackPlugin,
    useBabelRc
} = require('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: "antd", libraryDirectory: "lib", style: "css"
    }),
    useBabelRc(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "font-size-base": "12px",
            "text-color": 'rgba(0, 0, 0, .85)',
            "btn-height-base": '24px',
            "input-height-base": '24px',
            "form-item-margin-bottom": '8px'
        }
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'views': path.resolve(__dirname, 'src/views'),
        'img': path.resolve(__dirname, 'src/img')
    }),

    //addWebpackModuleRule({ test: /\.svg$/, use: ['raw-loader'] }),
    addWebpackModuleRule({ test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/, use: ['raw-loader'] }),


    addWebpackModuleRule({
        //exclude: [/src/, path.resolve(__dirname, 'node_modules/antd')],
        //test: /\.css$/,
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
            { loader: 'style-loader' },
            //{ loader: "css-loader" },
            {
                loader: 'postcss-loader',
                options: styles.getPostCssConfig({
                    themeImporter: {
                        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                    },
                    minify: true
                })
            }]
    }),
    addWebpackModuleRule({
        test: /\.html$/, use: ['html-loader']
    }),



    addWebpackPlugin(new CKEditorWebpackPlugin({
        //See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'zh-cn'
    }))

)

