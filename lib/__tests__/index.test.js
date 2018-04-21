const CssChunkHashPlugin = require('../index');

describe('CssChunkHashPlugin', () => {
  test('users default without options', () => {
    const plugin = new CssChunkHashPlugin();
    expect(plugin.options).toMatchSnapshot();
  });

  test('merges defaults with options', () => {
    const plugin = new CssChunkHashPlugin({ foo: 42 });
    expect(plugin.options).toMatchSnapshot();
  });

  test('uses declared options over defaults', () => {
    const plugin = new CssChunkHashPlugin({ inject: 'body' });
    expect(plugin.options).toMatchSnapshot();
  });

  describe('#apply', () => {
    const compiler = {
      hooks: {
        compilation: {
          tap: jest.fn(),
        },
      },
    };

    test('attaches hook to compilation', () => {
      const plugin = new CssChunkHashPlugin();
      plugin.apply(compiler);

      expect(compiler.hooks.compilation.tap).toHaveBeenCalledWith('CssChunksHtmlWebpackPlugin', expect.any(Function));
    });

    describe('compilation hook', () => {
      let compilation = {
        hooks: {
          htmlWebpackPluginBeforeHtmlProcessing: {
            tapAsync: jest.fn(),
          },
          htmlWebpackPluginAlterAssetTags: {
            tapAsync: jest.fn(),
          },
        },
      };

      beforeEach(() => {
        compilation = {
          hooks: {
            htmlWebpackPluginBeforeHtmlProcessing: {
              tapAsync: jest.fn(),
            },
            htmlWebpackPluginAlterAssetTags: {
              tapAsync: jest.fn(),
            },
          },
        };

        compiler.hooks.compilation.tap.mockImplementation((hookName, callback) => callback(compilation));
      });

      test('attaches async hook to htmlWebpackPluginBeforeHtmlProcessing', () => {
        const plugin = new CssChunkHashPlugin();
        plugin.apply(compiler);

        expect(compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync).toHaveBeenCalledWith(
          'html-webpack-plugin-before-html-generation',
          expect.any(Function)
        );
      });

      describe('htmlWebpackPluginBeforeHtmlProcessing hook', () => {
        let htmlPluginData;
        let hookCallback = jest.fn();

        beforeEach(() => {
          htmlPluginData = {
            assets: {},
          };

          compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync.mockImplementation((mockName, callback) =>
            callback(htmlPluginData, hookCallback)
          );
        });

        describe('cssHash', () => {
          test('assigns `cssHash` with chunkName -> file to css mapping to `htmlPluginData.assets`', () => {
            compilation.outputOptions = { publicPath: '' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
              {
                name: 'b',
                files: ['b.css', 'b.js'],
              },
            ];

            const plugin = new CssChunkHashPlugin({ inject: false });
            plugin.apply(compiler);

            expect(htmlPluginData.assets.cssHash).toEqual({
              a: 'a.css',
              b: 'b.css',
            });
          });

          test('uses only chunks with css files', () => {
            compilation.outputOptions = { publicPath: '' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
              {
                name: 'b',
                files: ['b.css', 'b.js'],
              },
              {
                name: 'c',
                files: ['c.js'],
              },
            ];

            const plugin = new CssChunkHashPlugin({ inject: false });
            plugin.apply(compiler);

            expect(htmlPluginData.assets.cssHash).toEqual({
              a: 'a.css',
              b: 'b.css',
            });
          });

          test('skips map files for css files', () => {
            compilation.outputOptions = { publicPath: '' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
              {
                name: 'b',
                files: ['b.css.map', 'b.css', 'b.js'],
              },
            ];

            const plugin = new CssChunkHashPlugin({ inject: false });
            plugin.apply(compiler);

            expect(htmlPluginData.assets.cssHash).toEqual({
              a: 'a.css',
              b: 'b.css',
            });
          });

          test('ignores empty chunks', () => {
            compilation.outputOptions = { publicPath: '' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
              {
                name: 'b',
                files: [],
              },
              {
                name: 'c',
                files: undefined,
              },
            ];

            const plugin = new CssChunkHashPlugin({ inject: false });
            plugin.apply(compiler);

            expect(htmlPluginData.assets.cssHash).toEqual({
              a: 'a.css',
            });
          });

          test('prepends public path to css chunks files', () => {
            compilation.outputOptions = { publicPath: '/public/' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
            ];

            const plugin = new CssChunkHashPlugin({ inject: false });
            plugin.apply(compiler);

            expect(htmlPluginData.assets.cssHash).toEqual({
              a: '/public/a.css',
            });
          });

          test('calls callback with `htmlPluginData`', () => {
            compilation.outputOptions = { publicPath: '/public/' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
            ];
            const plugin = new CssChunkHashPlugin({ inject: false });
            plugin.apply(compiler);

            expect(hookCallback).toHaveBeenCalledWith(null, htmlPluginData);
          });
        });

        describe('if inject is not `false`', () => {
          const assetsHookCallback = jest.fn();

          beforeEach(() => {
            compilation.outputOptions = { publicPath: '/' };
            compilation.chunks = [
              {
                name: 'a',
                files: ['a.css', 'a.js'],
              },
              {
                name: 'b',
                files: ['b.css', 'b.js'],
              },
              {
                name: 'c',
                files: ['c.css', 'c.js'],
              },
            ];

            htmlPluginData.head = [1, 2];

            htmlPluginData.body = [1, 2];

            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync.mockImplementation((mockName, callback) =>
              callback(htmlPluginData, assetsHookCallback)
            );

            const cssHash = { a: 'a.css' };
            CssChunkHashPlugin.prototype.createCssHash = jest.fn().mockReturnValue(cssHash);
          });

          test('attaches async hook to htmlWebpackPluginAlterAssetTags', () => {
            const plugin = new CssChunkHashPlugin({ inject: 'head' });
            plugin.apply(compiler);

            expect(compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync).toHaveBeenCalledWith(
              'html-webpack-plugin-alter-asset-tags',
              expect.any(Function)
            );
          });

          describe('when `inject` is `"head"`', () => {
            test('adds script tag to the end of `htmlPluginData.head`', () => {
              const plugin = new CssChunkHashPlugin({ inject: 'head' });
              plugin.apply(compiler);

              expect(htmlPluginData.head[htmlPluginData.head.length - 1]).toEqual({
                attributes: { type: 'text/javascript' },
                closeTag: true,
                innerHTML: 'window.__CSS_CHUNKS__ = {"a":"a.css"}',
                tagName: 'script',
              });
            });
          });

          describe('when `inject` is `"body"`', () => {
            test('adds script tag to the end of `htmlPluginData.body`', () => {
              const plugin = new CssChunkHashPlugin({ inject: 'body' });
              plugin.apply(compiler);

              expect(htmlPluginData.body[htmlPluginData.body.length - 1]).toEqual({
                attributes: { type: 'text/javascript' },
                closeTag: true,
                innerHTML: 'window.__CSS_CHUNKS__ = {"a":"a.css"}',
                tagName: 'script',
              });
            });

            test('calls callback with `htmlPluginData`', () => {
              const plugin = new CssChunkHashPlugin({ inject: 'body' });
              plugin.apply(compiler);

              expect(assetsHookCallback).toHaveBeenCalledWith(null, htmlPluginData);
            });
          });
        });
      });
    });
  });
});
