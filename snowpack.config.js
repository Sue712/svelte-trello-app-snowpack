const production = process.env.NODE_ENV === 'production'

function babelOptions() {
    return
    {
        plugins: production ? ["transform-remove-console"] : []
    }
}


module.exports = {
    mount: {
        public: '/',
        src: '/_dist_'
    },
    plugins: [
        ['@snowpack/plugin-svelte', {
            preprocess: require('svelte-preprocess')({
                scss: {
                    prependData: '@import "./src/scss/main.scss";'
                },
                //번들된 이후에 postcss실행
                postcss: {
                    plugins: [
                        //autoprefixer 모듈을 확인하는거까지 package.json에서 확인해주고 추가해줘야함
                        require('autoprefixer')()
                    ]
                },
                // babel: babelOptions()
            })

        }],
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        '@snowpack/plugin-optimize',
        // [' @snowpack/plugin-babel', {
        //     transformOptions: babelOptions()
        // }]

    ],
    alias: {
        '~': './src'
    }
}