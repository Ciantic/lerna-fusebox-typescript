const {
    FuseBox,
    Sparky,
    WebIndexPlugin,
    CSSPlugin,
    CSSResourcePlugin,
    CSSModules,
    PostCSSPlugin,
    SassPlugin,
    QuantumPlugin
} = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");
const express = require("express");
const path = require("path");

context(
    class {
        getConfig() {
            return FuseBox.init({
                homeDir: "src",
                output: "dist/$name.js",
                hash: this.isProduction,
                target: "browser@es6",
                useTypescriptCompiler: true,
                alias: {
                    "@yourcompany/components": "../components"
                },
                plugins: [
                    WebIndexPlugin({
                        title: "Just testing...",
                        template: "src/index.html"
                        //path: "/static/"
                    }),
                    [
                        // .scss (and modules) imports
                        SassPlugin({
                            importer: true
                        }),
                        CSSModules(),
                        PostCSSPlugin(),
                        CSSResourcePlugin({
                            dist: "dist/static/css-resources",
                            resolve: f => `/static/css-resources/${f}`
                        }),
                        CSSPlugin()
                    ],
                    [
                        // .css imports
                        PostCSSPlugin(),
                        CSSResourcePlugin({
                            dist: "dist/static/css-resources",
                            resolve: f => `/static/css-resources/${f}`
                        }),
                        CSSPlugin()
                    ],
                    this.isProduction &&
                        QuantumPlugin({
                            css: false,
                            bakeApiIntoBundle: "static/app",
                            treeshake: true
                            // uglify: true,
                            // extendServerImport: true
                        })
                ]
            });
        }
        createBundle(fuse) {
            const app = fuse.bundle("static/app");
            const vendor = fuse
                .bundle("static/vendor")
                .instructions("~ index.tsx");
            app.splitConfig({ dest: "static" });
            if (!this.isProduction) {
                app.watch();
                app.hmr();
            }
            app.instructions(">index.tsx");
            return app;
        }

        enableServer(fuse) {
            fuse.dev({ root: false }, server => {
                const dist = path.join(__dirname, "dist");
                const app = server.httpServer.app;
                app.use("/", express.static(dist));
                app.get("*", function(req, res) {
                    res.sendFile(path.join(dist, "index.html"));
                });
            });
        }
    }
);

task("clean", () =>
    src("dist")
        .clean("dist")
        .clean(".fusebox")
        .exec()
);

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    context.enableServer(fuse);
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    context.enableServer(fuse);
    //fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});
