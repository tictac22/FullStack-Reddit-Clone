/*! For license information please see main.js.LICENSE.txt */
;(() => {
	var __webpack_modules__ = {
			6235: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				module.exports = __webpack_require__(4506)
			},
			8185: (module, exports, __webpack_require__) => {
				"use strict"
				var finalhandler = __webpack_require__(5953),
					Router = __webpack_require__(6657),
					methods = __webpack_require__(4710),
					middleware = __webpack_require__(5767),
					query = __webpack_require__(1094),
					debug = __webpack_require__(6974)("express:application"),
					View = __webpack_require__(1167),
					http = __webpack_require__(3685),
					compileETag = __webpack_require__(4116).compileETag,
					compileQueryParser = __webpack_require__(4116).compileQueryParser,
					compileTrust = __webpack_require__(4116).compileTrust,
					deprecate = __webpack_require__(2352)("express"),
					flatten = __webpack_require__(276),
					merge = __webpack_require__(6588),
					resolve = __webpack_require__(1017).resolve,
					setPrototypeOf = __webpack_require__(5008),
					hasOwnProperty = Object.prototype.hasOwnProperty,
					slice = Array.prototype.slice,
					app = (module.exports = {})
				function logerror(err) {
					"test" !== this.get("env") && console.error(err.stack || err.toString())
				}
				;(app.init = function () {
					;(this.cache = {}), (this.engines = {}), (this.settings = {}), this.defaultConfiguration()
				}),
					(app.defaultConfiguration = function () {
						var env = "production"
						this.enable("x-powered-by"),
							this.set("etag", "weak"),
							this.set("env", env),
							this.set("query parser", "extended"),
							this.set("subdomain offset", 2),
							this.set("trust proxy", !1),
							Object.defineProperty(this.settings, "@@symbol:trust_proxy_default", {
								configurable: !0,
								value: !0,
							}),
							debug("booting in %s mode", env),
							this.on("mount", function (parent) {
								!0 === this.settings["@@symbol:trust_proxy_default"] &&
									"function" == typeof parent.settings["trust proxy fn"] &&
									(delete this.settings["trust proxy"], delete this.settings["trust proxy fn"]),
									setPrototypeOf(this.request, parent.request),
									setPrototypeOf(this.response, parent.response),
									setPrototypeOf(this.engines, parent.engines),
									setPrototypeOf(this.settings, parent.settings)
							}),
							(this.locals = Object.create(null)),
							(this.mountpath = "/"),
							(this.locals.settings = this.settings),
							this.set("view", View),
							this.set("views", resolve("views")),
							this.set("jsonp callback name", "callback"),
							this.enable("view cache"),
							Object.defineProperty(this, "router", {
								get: function () {
									throw new Error(
										"'app.router' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app."
									)
								},
							})
					}),
					(app.lazyrouter = function () {
						this._router ||
							((this._router = new Router({
								caseSensitive: this.enabled("case sensitive routing"),
								strict: this.enabled("strict routing"),
							})),
							this._router.use(query(this.get("query parser fn"))),
							this._router.use(middleware.init(this)))
					}),
					(app.handle = function (req, res, callback) {
						var router = this._router,
							done =
								callback ||
								finalhandler(req, res, { env: this.get("env"), onerror: logerror.bind(this) })
						if (!router) return debug("no routes defined on app"), void done()
						router.handle(req, res, done)
					}),
					(app.use = function (fn) {
						var offset = 0,
							path = "/"
						if ("function" != typeof fn) {
							for (var arg = fn; Array.isArray(arg) && 0 !== arg.length; ) arg = arg[0]
							"function" != typeof arg && ((offset = 1), (path = fn))
						}
						var fns = flatten(slice.call(arguments, offset))
						if (0 === fns.length) throw new TypeError("app.use() requires a middleware function")
						this.lazyrouter()
						var router = this._router
						return (
							fns.forEach(function (fn) {
								if (!fn || !fn.handle || !fn.set) return router.use(path, fn)
								debug(".use app under %s", path),
									(fn.mountpath = path),
									(fn.parent = this),
									router.use(path, function (req, res, next) {
										var orig = req.app
										fn.handle(req, res, function (err) {
											setPrototypeOf(req, orig.request),
												setPrototypeOf(res, orig.response),
												next(err)
										})
									}),
									fn.emit("mount", this)
							}, this),
							this
						)
					}),
					(app.route = function (path) {
						return this.lazyrouter(), this._router.route(path)
					}),
					(app.engine = function (ext, fn) {
						if ("function" != typeof fn) throw new Error("callback function required")
						var extension = "." !== ext[0] ? "." + ext : ext
						return (this.engines[extension] = fn), this
					}),
					(app.param = function (name, fn) {
						if ((this.lazyrouter(), Array.isArray(name))) {
							for (var i = 0; i < name.length; i++) this.param(name[i], fn)
							return this
						}
						return this._router.param(name, fn), this
					}),
					(app.set = function (setting, val) {
						if (1 !== arguments.length) {
							switch ((debug('set "%s" to %o', setting, val), (this.settings[setting] = val), setting)) {
								case "etag":
									this.set("etag fn", compileETag(val))
									break
								case "query parser":
									this.set("query parser fn", compileQueryParser(val))
									break
								case "trust proxy":
									this.set("trust proxy fn", compileTrust(val)),
										Object.defineProperty(this.settings, "@@symbol:trust_proxy_default", {
											configurable: !0,
											value: !1,
										})
							}
							return this
						}
						for (var settings = this.settings; settings && settings !== Object.prototype; ) {
							if (hasOwnProperty.call(settings, setting)) return settings[setting]
							settings = Object.getPrototypeOf(settings)
						}
					}),
					(app.path = function () {
						return this.parent ? this.parent.path() + this.mountpath : ""
					}),
					(app.enabled = function (setting) {
						return Boolean(this.set(setting))
					}),
					(app.disabled = function (setting) {
						return !this.set(setting)
					}),
					(app.enable = function (setting) {
						return this.set(setting, !0)
					}),
					(app.disable = function (setting) {
						return this.set(setting, !1)
					}),
					methods.forEach(function (method) {
						app[method] = function (path) {
							if ("get" === method && 1 === arguments.length) return this.set(path)
							this.lazyrouter()
							var route = this._router.route(path)
							return route[method].apply(route, slice.call(arguments, 1)), this
						}
					}),
					(app.all = function (path) {
						this.lazyrouter()
						for (
							var route = this._router.route(path), args = slice.call(arguments, 1), i = 0;
							i < methods.length;
							i++
						)
							route[methods[i]].apply(route, args)
						return this
					}),
					(app.del = deprecate.function(app.delete, "app.del: Use app.delete instead")),
					(app.render = function (name, options, callback) {
						var view,
							cache = this.cache,
							done = callback,
							engines = this.engines,
							opts = options,
							renderOptions = {}
						if (
							("function" == typeof options && ((done = options), (opts = {})),
							merge(renderOptions, this.locals),
							opts._locals && merge(renderOptions, opts._locals),
							merge(renderOptions, opts),
							null == renderOptions.cache && (renderOptions.cache = this.enabled("view cache")),
							renderOptions.cache && (view = cache[name]),
							!view)
						) {
							if (
								!(view = new (this.get("view"))(name, {
									defaultEngine: this.get("view engine"),
									root: this.get("views"),
									engines,
								})).path
							) {
								var dirs =
										Array.isArray(view.root) && view.root.length > 1
											? 'directories "' +
											  view.root.slice(0, -1).join('", "') +
											  '" or "' +
											  view.root[view.root.length - 1] +
											  '"'
											: 'directory "' + view.root + '"',
									err = new Error('Failed to lookup view "' + name + '" in views ' + dirs)
								return (err.view = view), done(err)
							}
							renderOptions.cache && (cache[name] = view)
						}
						!(function (view, options, callback) {
							try {
								view.render(options, callback)
							} catch (err) {
								callback(err)
							}
						})(view, renderOptions, done)
					}),
					(app.listen = function () {
						var server = http.createServer(this)
						return server.listen.apply(server, arguments)
					})
			},
			4506: (module, exports, __webpack_require__) => {
				"use strict"
				var bodyParser = __webpack_require__(3986),
					EventEmitter = __webpack_require__(1239).EventEmitter,
					mixin = __webpack_require__(4665),
					proto = __webpack_require__(8185),
					Route = __webpack_require__(5688),
					Router = __webpack_require__(6657),
					req = __webpack_require__(3287),
					res = __webpack_require__(5032)
				;((exports = module.exports =
					function () {
						var app = function (req, res, next) {
							app.handle(req, res, next)
						}
						return (
							mixin(app, EventEmitter.prototype, !1),
							mixin(app, proto, !1),
							(app.request = Object.create(req, {
								app: { configurable: !0, enumerable: !0, writable: !0, value: app },
							})),
							(app.response = Object.create(res, {
								app: { configurable: !0, enumerable: !0, writable: !0, value: app },
							})),
							app.init(),
							app
						)
					}).application = proto),
					(exports.request = req),
					(exports.response = res),
					(exports.Route = Route),
					(exports.Router = Router),
					(exports.json = bodyParser.json),
					(exports.query = __webpack_require__(1094)),
					(exports.raw = bodyParser.raw),
					(exports.static = __webpack_require__(3161)),
					(exports.text = bodyParser.text),
					(exports.urlencoded = bodyParser.urlencoded)
				;[
					"bodyParser",
					"compress",
					"cookieSession",
					"session",
					"logger",
					"cookieParser",
					"favicon",
					"responseTime",
					"errorHandler",
					"timeout",
					"methodOverride",
					"vhost",
					"csrf",
					"directory",
					"limit",
					"multipart",
					"staticCache",
				].forEach(function (name) {
					Object.defineProperty(exports, name, {
						get: function () {
							throw new Error(
								"Most middleware (like " +
									name +
									") is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware."
							)
						},
						configurable: !0,
					})
				})
			},
			5767: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var setPrototypeOf = __webpack_require__(5008)
				exports.init = function (app) {
					return function (req, res, next) {
						app.enabled("x-powered-by") && res.setHeader("X-Powered-By", "Express"),
							(req.res = res),
							(res.req = req),
							(req.next = next),
							setPrototypeOf(req, app.request),
							setPrototypeOf(res, app.response),
							(res.locals = res.locals || Object.create(null)),
							next()
					}
				}
			},
			1094: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var merge = __webpack_require__(6588),
					parseUrl = __webpack_require__(9215),
					qs = __webpack_require__(7104)
				module.exports = function (options) {
					var opts = merge({}, options),
						queryparse = qs.parse
					return (
						"function" == typeof options && ((queryparse = options), (opts = void 0)),
						void 0 !== opts && void 0 === opts.allowPrototypes && (opts.allowPrototypes = !0),
						function (req, res, next) {
							if (!req.query) {
								var val = parseUrl(req).query
								req.query = queryparse(val, opts)
							}
							next()
						}
					)
				}
			},
			3287: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var accepts = __webpack_require__(9390),
					deprecate = __webpack_require__(2352)("express"),
					isIP = __webpack_require__(1808).isIP,
					typeis = __webpack_require__(8003),
					http = __webpack_require__(3685),
					fresh = __webpack_require__(633),
					parseRange = __webpack_require__(509),
					parse = __webpack_require__(9215),
					proxyaddr = __webpack_require__(929),
					req = Object.create(http.IncomingMessage.prototype)
				function defineGetter(obj, name, getter) {
					Object.defineProperty(obj, name, { configurable: !0, enumerable: !0, get: getter })
				}
				;(module.exports = req),
					(req.get = req.header =
						function (name) {
							if (!name) throw new TypeError("name argument is required to req.get")
							if ("string" != typeof name) throw new TypeError("name must be a string to req.get")
							var lc = name.toLowerCase()
							switch (lc) {
								case "referer":
								case "referrer":
									return this.headers.referrer || this.headers.referer
								default:
									return this.headers[lc]
							}
						}),
					(req.accepts = function () {
						var accept = accepts(this)
						return accept.types.apply(accept, arguments)
					}),
					(req.acceptsEncodings = function () {
						var accept = accepts(this)
						return accept.encodings.apply(accept, arguments)
					}),
					(req.acceptsEncoding = deprecate.function(
						req.acceptsEncodings,
						"req.acceptsEncoding: Use acceptsEncodings instead"
					)),
					(req.acceptsCharsets = function () {
						var accept = accepts(this)
						return accept.charsets.apply(accept, arguments)
					}),
					(req.acceptsCharset = deprecate.function(
						req.acceptsCharsets,
						"req.acceptsCharset: Use acceptsCharsets instead"
					)),
					(req.acceptsLanguages = function () {
						var accept = accepts(this)
						return accept.languages.apply(accept, arguments)
					}),
					(req.acceptsLanguage = deprecate.function(
						req.acceptsLanguages,
						"req.acceptsLanguage: Use acceptsLanguages instead"
					)),
					(req.range = function (size, options) {
						var range = this.get("Range")
						if (range) return parseRange(size, range, options)
					}),
					(req.param = function (name, defaultValue) {
						var params = this.params || {},
							body = this.body || {},
							query = this.query || {},
							args = 1 === arguments.length ? "name" : "name, default"
						return (
							deprecate("req.param(" + args + "): Use req.params, req.body, or req.query instead"),
							null != params[name] && params.hasOwnProperty(name)
								? params[name]
								: null != body[name]
								? body[name]
								: null != query[name]
								? query[name]
								: defaultValue
						)
					}),
					(req.is = function (types) {
						var arr = types
						if (!Array.isArray(types)) {
							arr = new Array(arguments.length)
							for (var i = 0; i < arr.length; i++) arr[i] = arguments[i]
						}
						return typeis(this, arr)
					}),
					defineGetter(req, "protocol", function () {
						var proto = this.connection.encrypted ? "https" : "http"
						if (!this.app.get("trust proxy fn")(this.connection.remoteAddress, 0)) return proto
						var header = this.get("X-Forwarded-Proto") || proto,
							index = header.indexOf(",")
						return -1 !== index ? header.substring(0, index).trim() : header.trim()
					}),
					defineGetter(req, "secure", function () {
						return "https" === this.protocol
					}),
					defineGetter(req, "ip", function () {
						var trust = this.app.get("trust proxy fn")
						return proxyaddr(this, trust)
					}),
					defineGetter(req, "ips", function () {
						var trust = this.app.get("trust proxy fn"),
							addrs = proxyaddr.all(this, trust)
						return addrs.reverse().pop(), addrs
					}),
					defineGetter(req, "subdomains", function () {
						var hostname = this.hostname
						if (!hostname) return []
						var offset = this.app.get("subdomain offset"),
							subdomains = isIP(hostname) ? [hostname] : hostname.split(".").reverse()
						return subdomains.slice(offset)
					}),
					defineGetter(req, "path", function () {
						return parse(this).pathname
					}),
					defineGetter(req, "hostname", function () {
						var trust = this.app.get("trust proxy fn"),
							host = this.get("X-Forwarded-Host")
						if (
							(host && trust(this.connection.remoteAddress, 0)
								? -1 !== host.indexOf(",") && (host = host.substring(0, host.indexOf(",")).trimRight())
								: (host = this.get("Host")),
							host)
						) {
							var offset = "[" === host[0] ? host.indexOf("]") + 1 : 0,
								index = host.indexOf(":", offset)
							return -1 !== index ? host.substring(0, index) : host
						}
					}),
					defineGetter(
						req,
						"host",
						deprecate.function(function () {
							return this.hostname
						}, "req.host: Use req.hostname instead")
					),
					defineGetter(req, "fresh", function () {
						var method = this.method,
							res = this.res,
							status = res.statusCode
						return (
							("GET" === method || "HEAD" === method) &&
							((status >= 200 && status < 300) || 304 === status) &&
							fresh(this.headers, { etag: res.get("ETag"), "last-modified": res.get("Last-Modified") })
						)
					}),
					defineGetter(req, "stale", function () {
						return !this.fresh
					}),
					defineGetter(req, "xhr", function () {
						return "xmlhttprequest" === (this.get("X-Requested-With") || "").toLowerCase()
					})
			},
			5032: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var Buffer = __webpack_require__(5400).Buffer,
					contentDisposition = __webpack_require__(3298),
					createError = __webpack_require__(8931),
					deprecate = __webpack_require__(2352)("express"),
					encodeUrl = __webpack_require__(5523),
					escapeHtml = __webpack_require__(2079),
					http = __webpack_require__(3685),
					isAbsolute = __webpack_require__(4116).isAbsolute,
					onFinished = __webpack_require__(2718),
					path = __webpack_require__(1017),
					statuses = __webpack_require__(1154),
					merge = __webpack_require__(6588),
					sign = __webpack_require__(2553).sign,
					normalizeType = __webpack_require__(4116).normalizeType,
					normalizeTypes = __webpack_require__(4116).normalizeTypes,
					setCharset = __webpack_require__(4116).setCharset,
					cookie = __webpack_require__(4802),
					send = __webpack_require__(4119),
					extname = path.extname,
					mime = send.mime,
					resolve = path.resolve,
					vary = __webpack_require__(5561),
					res = Object.create(http.ServerResponse.prototype)
				module.exports = res
				var charsetRegExp = /;\s*charset\s*=/
				function sendfile(res, file, options, callback) {
					var streaming,
						done = !1
					function onaborted() {
						if (!done) {
							done = !0
							var err = new Error("Request aborted")
							;(err.code = "ECONNABORTED"), callback(err)
						}
					}
					function onerror(err) {
						done || ((done = !0), callback(err))
					}
					file.on("directory", function () {
						if (!done) {
							done = !0
							var err = new Error("EISDIR, read")
							;(err.code = "EISDIR"), callback(err)
						}
					}),
						file.on("end", function () {
							done || ((done = !0), callback())
						}),
						file.on("error", onerror),
						file.on("file", function () {
							streaming = !1
						}),
						file.on("stream", function () {
							streaming = !0
						}),
						onFinished(res, function (err) {
							return err && "ECONNRESET" === err.code
								? onaborted()
								: err
								? onerror(err)
								: void (
										done ||
										setImmediate(function () {
											!1 === streaming || done ? done || ((done = !0), callback()) : onaborted()
										})
								  )
						}),
						options.headers &&
							file.on("headers", function (res) {
								for (var obj = options.headers, keys = Object.keys(obj), i = 0; i < keys.length; i++) {
									var k = keys[i]
									res.setHeader(k, obj[k])
								}
							}),
						file.pipe(res)
				}
				function stringify(value, replacer, spaces, escape) {
					var json = replacer || spaces ? JSON.stringify(value, replacer, spaces) : JSON.stringify(value)
					return (
						escape &&
							"string" == typeof json &&
							(json = json.replace(/[<>&]/g, function (c) {
								switch (c.charCodeAt(0)) {
									case 60:
										return "\\u003c"
									case 62:
										return "\\u003e"
									case 38:
										return "\\u0026"
									default:
										return c
								}
							})),
						json
					)
				}
				;(res.status = function (code) {
					return (
						("string" == typeof code || Math.floor(code) !== code) &&
							code > 99 &&
							code < 1e3 &&
							deprecate(
								"res.status(" +
									JSON.stringify(code) +
									"): use res.status(" +
									Math.floor(code) +
									") instead"
							),
						(this.statusCode = code),
						this
					)
				}),
					(res.links = function (links) {
						var link = this.get("Link") || ""
						return (
							link && (link += ", "),
							this.set(
								"Link",
								link +
									Object.keys(links)
										.map(function (rel) {
											return "<" + links[rel] + '>; rel="' + rel + '"'
										})
										.join(", ")
							)
						)
					}),
					(res.send = function (body) {
						var encoding,
							type,
							chunk = body,
							req = this.req,
							app = this.app
						switch (
							(2 === arguments.length &&
								("number" != typeof arguments[0] && "number" == typeof arguments[1]
									? (deprecate("res.send(body, status): Use res.status(status).send(body) instead"),
									  (this.statusCode = arguments[1]))
									: (deprecate("res.send(status, body): Use res.status(status).send(body) instead"),
									  (this.statusCode = arguments[0]),
									  (chunk = arguments[1]))),
							"number" == typeof chunk &&
								1 === arguments.length &&
								(this.get("Content-Type") || this.type("txt"),
								deprecate("res.send(status): Use res.sendStatus(status) instead"),
								(this.statusCode = chunk),
								(chunk = statuses.message[chunk])),
							typeof chunk)
						) {
							case "string":
								this.get("Content-Type") || this.type("html")
								break
							case "boolean":
							case "number":
							case "object":
								if (null === chunk) chunk = ""
								else {
									if (!Buffer.isBuffer(chunk)) return this.json(chunk)
									this.get("Content-Type") || this.type("bin")
								}
						}
						"string" == typeof chunk &&
							((encoding = "utf8"),
							"string" == typeof (type = this.get("Content-Type")) &&
								this.set("Content-Type", setCharset(type, "utf-8")))
						var len,
							etag,
							etagFn = app.get("etag fn"),
							generateETag = !this.get("ETag") && "function" == typeof etagFn
						return (
							void 0 !== chunk &&
								(Buffer.isBuffer(chunk)
									? (len = chunk.length)
									: !generateETag && chunk.length < 1e3
									? (len = Buffer.byteLength(chunk, encoding))
									: ((chunk = Buffer.from(chunk, encoding)),
									  (encoding = void 0),
									  (len = chunk.length)),
								this.set("Content-Length", len)),
							generateETag &&
								void 0 !== len &&
								(etag = etagFn(chunk, encoding)) &&
								this.set("ETag", etag),
							req.fresh && (this.statusCode = 304),
							(204 !== this.statusCode && 304 !== this.statusCode) ||
								(this.removeHeader("Content-Type"),
								this.removeHeader("Content-Length"),
								this.removeHeader("Transfer-Encoding"),
								(chunk = "")),
							205 === this.statusCode &&
								(this.set("Content-Length", "0"), this.removeHeader("Transfer-Encoding"), (chunk = "")),
							"HEAD" === req.method ? this.end() : this.end(chunk, encoding),
							this
						)
					}),
					(res.json = function (obj) {
						var val = obj
						2 === arguments.length &&
							("number" == typeof arguments[1]
								? (deprecate("res.json(obj, status): Use res.status(status).json(obj) instead"),
								  (this.statusCode = arguments[1]))
								: (deprecate("res.json(status, obj): Use res.status(status).json(obj) instead"),
								  (this.statusCode = arguments[0]),
								  (val = arguments[1])))
						var app = this.app,
							escape = app.get("json escape"),
							replacer = app.get("json replacer"),
							spaces = app.get("json spaces"),
							body = stringify(val, replacer, spaces, escape)
						return this.get("Content-Type") || this.set("Content-Type", "application/json"), this.send(body)
					}),
					(res.jsonp = function (obj) {
						var val = obj
						2 === arguments.length &&
							("number" == typeof arguments[1]
								? (deprecate("res.jsonp(obj, status): Use res.status(status).jsonp(obj) instead"),
								  (this.statusCode = arguments[1]))
								: (deprecate("res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead"),
								  (this.statusCode = arguments[0]),
								  (val = arguments[1])))
						var app = this.app,
							escape = app.get("json escape"),
							replacer = app.get("json replacer"),
							spaces = app.get("json spaces"),
							body = stringify(val, replacer, spaces, escape),
							callback = this.req.query[app.get("jsonp callback name")]
						return (
							this.get("Content-Type") ||
								(this.set("X-Content-Type-Options", "nosniff"),
								this.set("Content-Type", "application/json")),
							Array.isArray(callback) && (callback = callback[0]),
							"string" == typeof callback &&
								0 !== callback.length &&
								(this.set("X-Content-Type-Options", "nosniff"),
								this.set("Content-Type", "text/javascript"),
								(callback = callback.replace(/[^\[\]\w$.]/g, "")),
								void 0 === body
									? (body = "")
									: "string" == typeof body &&
									  (body = body.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")),
								(body =
									"/**/ typeof " + callback + " === 'function' && " + callback + "(" + body + ");")),
							this.send(body)
						)
					}),
					(res.sendStatus = function (statusCode) {
						var body = statuses.message[statusCode] || String(statusCode)
						return (this.statusCode = statusCode), this.type("txt"), this.send(body)
					}),
					(res.sendFile = function (path, options, callback) {
						var done = callback,
							req = this.req,
							next = req.next,
							opts = options || {}
						if (!path) throw new TypeError("path argument is required to res.sendFile")
						if ("string" != typeof path) throw new TypeError("path must be a string to res.sendFile")
						if (
							("function" == typeof options && ((done = options), (opts = {})),
							!opts.root && !isAbsolute(path))
						)
							throw new TypeError("path must be absolute or specify root to res.sendFile")
						var pathname = encodeURI(path)
						sendfile(this, send(req, pathname, opts), opts, function (err) {
							return done
								? done(err)
								: err && "EISDIR" === err.code
								? next()
								: void (err && "ECONNABORTED" !== err.code && "write" !== err.syscall && next(err))
						})
					}),
					(res.sendfile = function (path, options, callback) {
						var done = callback,
							req = this.req,
							next = req.next,
							opts = options || {}
						"function" == typeof options && ((done = options), (opts = {})),
							sendfile(this, send(req, path, opts), opts, function (err) {
								return done
									? done(err)
									: err && "EISDIR" === err.code
									? next()
									: void (err && "ECONNABORTED" !== err.code && "write" !== err.syscall && next(err))
							})
					}),
					(res.sendfile = deprecate.function(res.sendfile, "res.sendfile: Use res.sendFile instead")),
					(res.download = function (path, filename, options, callback) {
						var done = callback,
							name = filename,
							opts = options || null
						"function" == typeof filename
							? ((done = filename), (name = null), (opts = null))
							: "function" == typeof options && ((done = options), (opts = null)),
							"object" != typeof filename ||
								("function" != typeof options && void 0 !== options) ||
								((name = null), (opts = filename))
						var headers = { "Content-Disposition": contentDisposition(name || path) }
						if (opts && opts.headers)
							for (var keys = Object.keys(opts.headers), i = 0; i < keys.length; i++) {
								var key = keys[i]
								"content-disposition" !== key.toLowerCase() && (headers[key] = opts.headers[key])
							}
						;(opts = Object.create(opts)).headers = headers
						var fullPath = opts.root ? path : resolve(path)
						return this.sendFile(fullPath, opts, done)
					}),
					(res.contentType = res.type =
						function (type) {
							var ct = -1 === type.indexOf("/") ? mime.lookup(type) : type
							return this.set("Content-Type", ct)
						}),
					(res.format = function (obj) {
						var req = this.req,
							next = req.next,
							keys = Object.keys(obj).filter(function (v) {
								return "default" !== v
							}),
							key = keys.length > 0 && req.accepts(keys)
						return (
							this.vary("Accept"),
							key
								? (this.set("Content-Type", normalizeType(key).value), obj[key](req, this, next))
								: obj.default
								? obj.default(req, this, next)
								: next(
										createError(406, {
											types: normalizeTypes(keys).map(function (o) {
												return o.value
											}),
										})
								  ),
							this
						)
					}),
					(res.attachment = function (filename) {
						return (
							filename && this.type(extname(filename)),
							this.set("Content-Disposition", contentDisposition(filename)),
							this
						)
					}),
					(res.append = function (field, val) {
						var prev = this.get(field),
							value = val
						return (
							prev &&
								(value = Array.isArray(prev)
									? prev.concat(val)
									: Array.isArray(val)
									? [prev].concat(val)
									: [prev, val]),
							this.set(field, value)
						)
					}),
					(res.set = res.header =
						function (field, val) {
							if (2 === arguments.length) {
								var value = Array.isArray(val) ? val.map(String) : String(val)
								if ("content-type" === field.toLowerCase()) {
									if (Array.isArray(value))
										throw new TypeError("Content-Type cannot be set to an Array")
									if (!charsetRegExp.test(value)) {
										var charset = mime.charsets.lookup(value.split(";")[0])
										charset && (value += "; charset=" + charset.toLowerCase())
									}
								}
								this.setHeader(field, value)
							} else for (var key in field) this.set(key, field[key])
							return this
						}),
					(res.get = function (field) {
						return this.getHeader(field)
					}),
					(res.clearCookie = function (name, options) {
						var opts = merge({ expires: new Date(1), path: "/" }, options)
						return this.cookie(name, "", opts)
					}),
					(res.cookie = function (name, value, options) {
						var opts = merge({}, options),
							secret = this.req.secret,
							signed = opts.signed
						if (signed && !secret) throw new Error('cookieParser("secret") required for signed cookies')
						var val = "object" == typeof value ? "j:" + JSON.stringify(value) : String(value)
						if ((signed && (val = "s:" + sign(val, secret)), null != opts.maxAge)) {
							var maxAge = opts.maxAge - 0
							isNaN(maxAge) ||
								((opts.expires = new Date(Date.now() + maxAge)),
								(opts.maxAge = Math.floor(maxAge / 1e3)))
						}
						return (
							null == opts.path && (opts.path = "/"),
							this.append("Set-Cookie", cookie.serialize(name, String(val), opts)),
							this
						)
					}),
					(res.location = function (url) {
						var loc = url
						return (
							"back" === url && (loc = this.req.get("Referrer") || "/"),
							this.set("Location", encodeUrl(loc))
						)
					}),
					(res.redirect = function (url) {
						var body,
							address = url,
							status = 302
						2 === arguments.length &&
							("number" == typeof arguments[0]
								? ((status = arguments[0]), (address = arguments[1]))
								: (deprecate("res.redirect(url, status): Use res.redirect(status, url) instead"),
								  (status = arguments[1]))),
							(address = this.location(address).get("Location")),
							this.format({
								text: function () {
									body = statuses.message[status] + ". Redirecting to " + address
								},
								html: function () {
									var u = escapeHtml(address)
									body =
										"<p>" +
										statuses.message[status] +
										'. Redirecting to <a href="' +
										u +
										'">' +
										u +
										"</a></p>"
								},
								default: function () {
									body = ""
								},
							}),
							(this.statusCode = status),
							this.set("Content-Length", Buffer.byteLength(body)),
							"HEAD" === this.req.method ? this.end() : this.end(body)
					}),
					(res.vary = function (field) {
						return !field || (Array.isArray(field) && !field.length)
							? (deprecate("res.vary(): Provide a field name"), this)
							: (vary(this, field), this)
					}),
					(res.render = function (view, options, callback) {
						var app = this.req.app,
							done = callback,
							opts = options || {},
							req = this.req,
							self = this
						"function" == typeof options && ((done = options), (opts = {})),
							(opts._locals = self.locals),
							(done =
								done ||
								function (err, str) {
									if (err) return req.next(err)
									self.send(str)
								}),
							app.render(view, opts, done)
					})
			},
			6657: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var Route = __webpack_require__(5688),
					Layer = __webpack_require__(7813),
					methods = __webpack_require__(4710),
					mixin = __webpack_require__(6588),
					debug = __webpack_require__(6974)("express:router"),
					deprecate = __webpack_require__(2352)("express"),
					flatten = __webpack_require__(276),
					parseUrl = __webpack_require__(9215),
					setPrototypeOf = __webpack_require__(5008),
					objectRegExp = /^\[object (\S+)\]$/,
					slice = Array.prototype.slice,
					toString = Object.prototype.toString,
					proto = (module.exports = function (options) {
						var opts = options || {}
						function router(req, res, next) {
							router.handle(req, res, next)
						}
						return (
							setPrototypeOf(router, proto),
							(router.params = {}),
							(router._params = []),
							(router.caseSensitive = opts.caseSensitive),
							(router.mergeParams = opts.mergeParams),
							(router.strict = opts.strict),
							(router.stack = []),
							router
						)
					})
				function appendMethods(list, addition) {
					for (var i = 0; i < addition.length; i++) {
						var method = addition[i]
						;-1 === list.indexOf(method) && list.push(method)
					}
				}
				function gettype(obj) {
					var type = typeof obj
					return "object" !== type ? type : toString.call(obj).replace(objectRegExp, "$1")
				}
				function matchLayer(layer, path) {
					try {
						return layer.match(path)
					} catch (err) {
						return err
					}
				}
				;(proto.param = function (name, fn) {
					if ("function" == typeof name)
						return deprecate("router.param(fn): Refactor to use path params"), void this._params.push(name)
					var ret,
						params = this._params,
						len = params.length
					":" === name[0] &&
						(deprecate(
							"router.param(" +
								JSON.stringify(name) +
								", fn): Use router.param(" +
								JSON.stringify(name.slice(1)) +
								", fn) instead"
						),
						(name = name.slice(1)))
					for (var i = 0; i < len; ++i) (ret = params[i](name, fn)) && (fn = ret)
					if ("function" != typeof fn) throw new Error("invalid param() call for " + name + ", got " + fn)
					return (this.params[name] = this.params[name] || []).push(fn), this
				}),
					(proto.handle = function (req, res, out) {
						var self = this
						debug("dispatching %s %s", req.method, req.url)
						var old,
							fn,
							idx = 0,
							protohost =
								(function (url) {
									if ("string" != typeof url || 0 === url.length || "/" === url[0]) return
									var searchIndex = url.indexOf("?"),
										pathLength = -1 !== searchIndex ? searchIndex : url.length,
										fqdnIndex = url.slice(0, pathLength).indexOf("://")
									return -1 !== fqdnIndex ? url.substring(0, url.indexOf("/", 3 + fqdnIndex)) : void 0
								})(req.url) || "",
							removed = "",
							slashAdded = !1,
							sync = 0,
							paramcalled = {},
							options = [],
							stack = self.stack,
							parentParams = req.params,
							parentUrl = req.baseUrl || "",
							done = (function (fn, obj) {
								for (
									var props = new Array(arguments.length - 2),
										vals = new Array(arguments.length - 2),
										i = 0;
									i < props.length;
									i++
								)
									(props[i] = arguments[i + 2]), (vals[i] = obj[props[i]])
								return function () {
									for (var i = 0; i < props.length; i++) obj[props[i]] = vals[i]
									return fn.apply(this, arguments)
								}
							})(out, req, "baseUrl", "next", "params")
						function next(err) {
							var layerError = "route" === err ? null : err
							if (
								(slashAdded && ((req.url = req.url.slice(1)), (slashAdded = !1)),
								0 !== removed.length &&
									((req.baseUrl = parentUrl),
									(req.url = protohost + removed + req.url.slice(protohost.length)),
									(removed = "")),
								"router" !== layerError)
							)
								if (idx >= stack.length) setImmediate(done, layerError)
								else {
									if (++sync > 100) return setImmediate(next, err)
									var layer,
										match,
										route,
										path = (function (req) {
											try {
												return parseUrl(req).pathname
											} catch (err) {
												return
											}
										})(req)
									if (null == path) return done(layerError)
									for (; !0 !== match && idx < stack.length; )
										if (
											((match = matchLayer((layer = stack[idx++]), path)),
											(route = layer.route),
											"boolean" != typeof match && (layerError = layerError || match),
											!0 === match && route)
										)
											if (layerError) match = !1
											else {
												var method = req.method,
													has_method = route._handles_method(method)
												has_method ||
													"OPTIONS" !== method ||
													appendMethods(options, route._options()),
													has_method || "HEAD" === method || (match = !1)
											}
									if (!0 !== match) return done(layerError)
									route && (req.route = route),
										(req.params = self.mergeParams
											? (function (params, parent) {
													if ("object" != typeof parent || !parent) return params
													var obj = mixin({}, parent)
													if (!(0 in params) || !(0 in parent)) return mixin(obj, params)
													var i = 0,
														o = 0
													for (; i in params; ) i++
													for (; o in parent; ) o++
													for (i--; i >= 0; i--)
														(params[i + o] = params[i]), i < o && delete params[i]
													return mixin(obj, params)
											  })(layer.params, parentParams)
											: layer.params)
									var layerPath = layer.path
									self.process_params(layer, paramcalled, req, res, function (err) {
										err
											? next(layerError || err)
											: route
											? layer.handle_request(req, res, next)
											: (function (layer, layerError, layerPath, path) {
													if (0 !== layerPath.length) {
														if (layerPath !== path.slice(0, layerPath.length))
															return void next(layerError)
														var c = path[layerPath.length]
														if (c && "/" !== c && "." !== c) return next(layerError)
														debug("trim prefix (%s) from url %s", layerPath, req.url),
															(removed = layerPath),
															(req.url =
																protohost +
																req.url.slice(protohost.length + removed.length)),
															protohost ||
																"/" === req.url[0] ||
																((req.url = "/" + req.url), (slashAdded = !0)),
															(req.baseUrl =
																parentUrl +
																("/" === removed[removed.length - 1]
																	? removed.substring(0, removed.length - 1)
																	: removed))
													}
													debug("%s %s : %s", layer.name, layerPath, req.originalUrl),
														layerError
															? layer.handle_error(layerError, req, res, next)
															: layer.handle_request(req, res, next)
											  })(layer, layerError, layerPath, path),
											(sync = 0)
									})
								}
							else setImmediate(done, null)
						}
						;(req.next = next),
							"OPTIONS" === req.method &&
								((old = done),
								(fn = function (old, err) {
									if (err || 0 === options.length) return old(err)
									!(function (res, options, next) {
										try {
											var body = options.join(",")
											res.set("Allow", body), res.send(body)
										} catch (err) {
											next(err)
										}
									})(res, options, old)
								}),
								(done = function () {
									var args = new Array(arguments.length + 1)
									args[0] = old
									for (var i = 0, len = arguments.length; i < len; i++) args[i + 1] = arguments[i]
									fn.apply(this, args)
								})),
							(req.baseUrl = parentUrl),
							(req.originalUrl = req.originalUrl || req.url),
							next()
					}),
					(proto.process_params = function (layer, called, req, res, done) {
						var params = this.params,
							keys = layer.keys
						if (!keys || 0 === keys.length) return done()
						var name,
							key,
							paramVal,
							paramCallbacks,
							paramCalled,
							i = 0,
							paramIndex = 0
						function param(err) {
							return err
								? done(err)
								: i >= keys.length
								? done()
								: ((paramIndex = 0),
								  (key = keys[i++]),
								  (name = key.name),
								  (paramVal = req.params[name]),
								  (paramCallbacks = params[name]),
								  (paramCalled = called[name]),
								  void 0 !== paramVal && paramCallbacks
										? paramCalled &&
										  (paramCalled.match === paramVal ||
												(paramCalled.error && "route" !== paramCalled.error))
											? ((req.params[name] = paramCalled.value), param(paramCalled.error))
											: ((called[name] = paramCalled =
													{ error: null, match: paramVal, value: paramVal }),
											  void paramCallback())
										: param())
						}
						function paramCallback(err) {
							var fn = paramCallbacks[paramIndex++]
							if (((paramCalled.value = req.params[key.name]), err))
								return (paramCalled.error = err), void param(err)
							if (!fn) return param()
							try {
								fn(req, res, paramCallback, paramVal, key.name)
							} catch (e) {
								paramCallback(e)
							}
						}
						param()
					}),
					(proto.use = function (fn) {
						var offset = 0,
							path = "/"
						if ("function" != typeof fn) {
							for (var arg = fn; Array.isArray(arg) && 0 !== arg.length; ) arg = arg[0]
							"function" != typeof arg && ((offset = 1), (path = fn))
						}
						var callbacks = flatten(slice.call(arguments, offset))
						if (0 === callbacks.length) throw new TypeError("Router.use() requires a middleware function")
						for (var i = 0; i < callbacks.length; i++) {
							if ("function" != typeof (fn = callbacks[i]))
								throw new TypeError(
									"Router.use() requires a middleware function but got a " + gettype(fn)
								)
							debug("use %o %s", path, fn.name || "<anonymous>")
							var layer = new Layer(path, { sensitive: this.caseSensitive, strict: !1, end: !1 }, fn)
							;(layer.route = void 0), this.stack.push(layer)
						}
						return this
					}),
					(proto.route = function (path) {
						var route = new Route(path),
							layer = new Layer(
								path,
								{ sensitive: this.caseSensitive, strict: this.strict, end: !0 },
								route.dispatch.bind(route)
							)
						return (layer.route = route), this.stack.push(layer), route
					}),
					methods.concat("all").forEach(function (method) {
						proto[method] = function (path) {
							var route = this.route(path)
							return route[method].apply(route, slice.call(arguments, 1)), this
						}
					})
			},
			7813: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var pathRegexp = __webpack_require__(99),
					debug = __webpack_require__(6974)("express:router:layer"),
					hasOwnProperty = Object.prototype.hasOwnProperty
				function Layer(path, options, fn) {
					if (!(this instanceof Layer)) return new Layer(path, options, fn)
					debug("new %o", path)
					var opts = options || {}
					;(this.handle = fn),
						(this.name = fn.name || "<anonymous>"),
						(this.params = void 0),
						(this.path = void 0),
						(this.regexp = pathRegexp(path, (this.keys = []), opts)),
						(this.regexp.fast_star = "*" === path),
						(this.regexp.fast_slash = "/" === path && !1 === opts.end)
				}
				function decode_param(val) {
					if ("string" != typeof val || 0 === val.length) return val
					try {
						return decodeURIComponent(val)
					} catch (err) {
						throw (
							(err instanceof URIError &&
								((err.message = "Failed to decode param '" + val + "'"),
								(err.status = err.statusCode = 400)),
							err)
						)
					}
				}
				;(module.exports = Layer),
					(Layer.prototype.handle_error = function (error, req, res, next) {
						var fn = this.handle
						if (4 !== fn.length) return next(error)
						try {
							fn(error, req, res, next)
						} catch (err) {
							next(err)
						}
					}),
					(Layer.prototype.handle_request = function (req, res, next) {
						var fn = this.handle
						if (fn.length > 3) return next()
						try {
							fn(req, res, next)
						} catch (err) {
							next(err)
						}
					}),
					(Layer.prototype.match = function (path) {
						var match
						if (null != path) {
							if (this.regexp.fast_slash) return (this.params = {}), (this.path = ""), !0
							if (this.regexp.fast_star)
								return (this.params = { 0: decode_param(path) }), (this.path = path), !0
							match = this.regexp.exec(path)
						}
						if (!match) return (this.params = void 0), (this.path = void 0), !1
						;(this.params = {}), (this.path = match[0])
						for (var keys = this.keys, params = this.params, i = 1; i < match.length; i++) {
							var prop = keys[i - 1].name,
								val = decode_param(match[i])
							;(void 0 === val && hasOwnProperty.call(params, prop)) || (params[prop] = val)
						}
						return !0
					})
			},
			5688: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var debug = __webpack_require__(6974)("express:router:route"),
					flatten = __webpack_require__(276),
					Layer = __webpack_require__(7813),
					methods = __webpack_require__(4710),
					slice = Array.prototype.slice,
					toString = Object.prototype.toString
				function Route(path) {
					;(this.path = path), (this.stack = []), debug("new %o", path), (this.methods = {})
				}
				;(module.exports = Route),
					(Route.prototype._handles_method = function (method) {
						if (this.methods._all) return !0
						var name = method.toLowerCase()
						return "head" !== name || this.methods.head || (name = "get"), Boolean(this.methods[name])
					}),
					(Route.prototype._options = function () {
						var methods = Object.keys(this.methods)
						this.methods.get && !this.methods.head && methods.push("head")
						for (var i = 0; i < methods.length; i++) methods[i] = methods[i].toUpperCase()
						return methods
					}),
					(Route.prototype.dispatch = function (req, res, done) {
						var idx = 0,
							stack = this.stack,
							sync = 0
						if (0 === stack.length) return done()
						var method = req.method.toLowerCase()
						"head" !== method || this.methods.head || (method = "get"),
							(req.route = this),
							(function next(err) {
								if (err && "route" === err) return done()
								if (err && "router" === err) return done(err)
								var layer = stack[idx++]
								if (!layer) return done(err)
								if (++sync > 100) return setImmediate(next, err)
								if (layer.method && layer.method !== method) return next(err)
								err ? layer.handle_error(err, req, res, next) : layer.handle_request(req, res, next)
								sync = 0
							})()
					}),
					(Route.prototype.all = function () {
						for (var handles = flatten(slice.call(arguments)), i = 0; i < handles.length; i++) {
							var handle = handles[i]
							if ("function" != typeof handle) {
								var type = toString.call(handle),
									msg = "Route.all() requires a callback function but got a " + type
								throw new TypeError(msg)
							}
							var layer = Layer("/", {}, handle)
							;(layer.method = void 0), (this.methods._all = !0), this.stack.push(layer)
						}
						return this
					}),
					methods.forEach(function (method) {
						Route.prototype[method] = function () {
							for (var handles = flatten(slice.call(arguments)), i = 0; i < handles.length; i++) {
								var handle = handles[i]
								if ("function" != typeof handle) {
									var type = toString.call(handle),
										msg = "Route." + method + "() requires a callback function but got a " + type
									throw new Error(msg)
								}
								debug("%s %o", method, this.path)
								var layer = Layer("/", {}, handle)
								;(layer.method = method), (this.methods[method] = !0), this.stack.push(layer)
							}
							return this
						}
					})
			},
			4116: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var Buffer = __webpack_require__(5400).Buffer,
					contentDisposition = __webpack_require__(3298),
					contentType = __webpack_require__(9686),
					deprecate = __webpack_require__(2352)("express"),
					flatten = __webpack_require__(276),
					mime = __webpack_require__(4119).mime,
					etag = __webpack_require__(8046),
					proxyaddr = __webpack_require__(929),
					qs = __webpack_require__(7104),
					querystring = __webpack_require__(3477)
				function createETagGenerator(options) {
					return function (body, encoding) {
						var buf = Buffer.isBuffer(body) ? body : Buffer.from(body, encoding)
						return etag(buf, options)
					}
				}
				function parseExtendedQueryString(str) {
					return qs.parse(str, { allowPrototypes: !0 })
				}
				function newObject() {
					return {}
				}
				;(exports.etag = createETagGenerator({ weak: !1 })),
					(exports.wetag = createETagGenerator({ weak: !0 })),
					(exports.isAbsolute = function (path) {
						return (
							"/" === path[0] ||
							(":" === path[1] && ("\\" === path[2] || "/" === path[2])) ||
							"\\\\" === path.substring(0, 2) ||
							void 0
						)
					}),
					(exports.flatten = deprecate.function(
						flatten,
						"utils.flatten: use array-flatten npm module instead"
					)),
					(exports.normalizeType = function (type) {
						return ~type.indexOf("/")
							? (function (str, index) {
									for (
										var parts = str.split(/ *; */),
											ret = { value: parts[0], quality: 1, params: {}, originalIndex: index },
											i = 1;
										i < parts.length;
										++i
									) {
										var pms = parts[i].split(/ *= */)
										"q" === pms[0]
											? (ret.quality = parseFloat(pms[1]))
											: (ret.params[pms[0]] = pms[1])
									}
									return ret
							  })(type)
							: { value: mime.lookup(type), params: {} }
					}),
					(exports.normalizeTypes = function (types) {
						for (var ret = [], i = 0; i < types.length; ++i) ret.push(exports.normalizeType(types[i]))
						return ret
					}),
					(exports.contentDisposition = deprecate.function(
						contentDisposition,
						"utils.contentDisposition: use content-disposition npm module instead"
					)),
					(exports.compileETag = function (val) {
						var fn
						if ("function" == typeof val) return val
						switch (val) {
							case !0:
							case "weak":
								fn = exports.wetag
								break
							case !1:
								break
							case "strong":
								fn = exports.etag
								break
							default:
								throw new TypeError("unknown value for etag function: " + val)
						}
						return fn
					}),
					(exports.compileQueryParser = function (val) {
						var fn
						if ("function" == typeof val) return val
						switch (val) {
							case !0:
							case "simple":
								fn = querystring.parse
								break
							case !1:
								fn = newObject
								break
							case "extended":
								fn = parseExtendedQueryString
								break
							default:
								throw new TypeError("unknown value for query parser function: " + val)
						}
						return fn
					}),
					(exports.compileTrust = function (val) {
						return "function" == typeof val
							? val
							: !0 === val
							? function () {
									return !0
							  }
							: "number" == typeof val
							? function (a, i) {
									return i < val
							  }
							: ("string" == typeof val &&
									(val = val.split(",").map(function (v) {
										return v.trim()
									})),
							  proxyaddr.compile(val || []))
					}),
					(exports.setCharset = function (type, charset) {
						if (!type || !charset) return type
						var parsed = contentType.parse(type)
						return (parsed.parameters.charset = charset), contentType.format(parsed)
					})
			},
			1167: (module, __unused_webpack_exports, __webpack_require__) => {
				"use strict"
				var debug = __webpack_require__(6974)("express:view"),
					path = __webpack_require__(1017),
					fs = __webpack_require__(7147),
					dirname = path.dirname,
					basename = path.basename,
					extname = path.extname,
					join = path.join,
					resolve = path.resolve
				function View(name, options) {
					var opts = options || {}
					if (
						((this.defaultEngine = opts.defaultEngine),
						(this.ext = extname(name)),
						(this.name = name),
						(this.root = opts.root),
						!this.ext && !this.defaultEngine)
					)
						throw new Error("No default engine was specified and no extension was provided.")
					var fileName = name
					if (
						(this.ext ||
							((this.ext = "." !== this.defaultEngine[0] ? "." + this.defaultEngine : this.defaultEngine),
							(fileName += this.ext)),
						!opts.engines[this.ext])
					) {
						var mod = this.ext.slice(1)
						debug('require "%s"', mod)
						var fn = __webpack_require__(7280)(mod).__express
						if ("function" != typeof fn)
							throw new Error('Module "' + mod + '" does not provide a view engine.')
						opts.engines[this.ext] = fn
					}
					;(this.engine = opts.engines[this.ext]), (this.path = this.lookup(fileName))
				}
				function tryStat(path) {
					debug('stat "%s"', path)
					try {
						return fs.statSync(path)
					} catch (e) {
						return
					}
				}
				;(module.exports = View),
					(View.prototype.lookup = function (name) {
						var path,
							roots = [].concat(this.root)
						debug('lookup "%s"', name)
						for (var i = 0; i < roots.length && !path; i++) {
							var root = roots[i],
								loc = resolve(root, name),
								dir = dirname(loc),
								file = basename(loc)
							path = this.resolve(dir, file)
						}
						return path
					}),
					(View.prototype.render = function (options, callback) {
						debug('render "%s"', this.path), this.engine(this.path, options, callback)
					}),
					(View.prototype.resolve = function (dir, file) {
						var ext = this.ext,
							path = join(dir, file),
							stat = tryStat(path)
						return (stat && stat.isFile()) ||
							((stat = tryStat((path = join(dir, basename(file, ext), "index" + ext)))) && stat.isFile())
							? path
							: void 0
					})
			},
			7280: (module) => {
				function webpackEmptyContext(req) {
					var e = new Error("Cannot find module '" + req + "'")
					throw ((e.code = "MODULE_NOT_FOUND"), e)
				}
				;(webpackEmptyContext.keys = () => []),
					(webpackEmptyContext.resolve = webpackEmptyContext),
					(webpackEmptyContext.id = 7280),
					(module.exports = webpackEmptyContext)
			},
			3199: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.AppModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					auth_module_1 = __webpack_require__(2611),
					community_module_1 = __webpack_require__(1374),
					post_module_1 = __webpack_require__(204),
					user_module_1 = __webpack_require__(9082)
				let AppModule = class AppModule {}
				;(AppModule = tslib_1.__decorate(
					[
						(0, common_1.Module)({
							imports: [
								auth_module_1.AuthModule,
								post_module_1.PostModule,
								community_module_1.CommunityModule,
								user_module_1.UserModule,
							],
						}),
					],
					AppModule
				)),
					(exports.AppModule = AppModule)
			},
			9335: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.AuthController = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340),
					express_1 = __webpack_require__(6860),
					auth_service_1 = __webpack_require__(9946),
					auth_dto_1 = __webpack_require__(456),
					guards_1 = __webpack_require__(4088)
				let AuthController = class AuthController {
					constructor(authService) {
						this.authService = authService
					}
					signup(body, res) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const userData = yield this.authService.signup(body)
							return res.cookie("refreshToken", userData.refreshToken), userData
						})
					}
					signin(body, res) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const userData = yield this.authService.signin(body)
							return res.cookie("refreshToken", userData.refreshToken), userData
						})
					}
					googleAuth() {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {})
					}
					googleAuthRedirect(req, res) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const data = yield this.authService.socialLogin(req)
							return (
								res.cookie("refreshToken", data.refreshToken),
								res.redirect(`${process.env.FRONTEND_BASE_URL}/account/success`)
							)
						})
					}
					twitterAuth() {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {})
					}
					twitterAuthRedirect(req, res) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const data = yield this.authService.socialLogin(req)
							return (
								res.cookie("refreshToken", data.refreshToken),
								res.redirect(`${process.env.FRONTEND_BASE_URL}/account/success`)
							)
						})
					}
					refresh(req, res) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const userData = yield this.authService.refresh(req)
							return res.cookie("refreshToken", userData.refreshToken), Object.assign({}, userData)
						})
					}
					logout(res) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return res.clearCookie("refreshToken"), { message: "logout success" }
						})
					}
				}
				tslib_1.__decorate(
					[
						(0, common_1.Post)("signup"),
						tslib_1.__param(0, (0, common_1.Body)()),
						tslib_1.__param(1, (0, common_1.Res)({ passthrough: !0 })),
						tslib_1.__metadata("design:type", Function),
						tslib_1.__metadata("design:paramtypes", [
							"function" == typeof (_a = void 0 !== auth_dto_1.AuthSignUpDto && auth_dto_1.AuthSignUpDto)
								? _a
								: Object,
							"function" == typeof (_b = void 0 !== express_1.Response && express_1.Response)
								? _b
								: Object,
						]),
						tslib_1.__metadata("design:returntype", Promise),
					],
					AuthController.prototype,
					"signup",
					null
				),
					tslib_1.__decorate(
						[
							(0, common_1.Post)("signin"),
							tslib_1.__param(0, (0, common_1.Body)()),
							tslib_1.__param(1, (0, common_1.Res)({ passthrough: !0 })),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_c = void 0 !== auth_dto_1.AuthSignInDto && auth_dto_1.AuthSignInDto)
									? _c
									: Object,
								"function" == typeof (_d = void 0 !== express_1.Response && express_1.Response)
									? _d
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"signin",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("google"),
							(0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", []),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"googleAuth",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("google/callback"),
							(0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
							tslib_1.__param(0, (0, common_1.Req)()),
							tslib_1.__param(1, (0, common_1.Res)({ passthrough: !0 })),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								Object,
								"function" == typeof (_e = void 0 !== express_1.Response && express_1.Response)
									? _e
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"googleAuthRedirect",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("twitter"),
							(0, common_1.UseGuards)((0, passport_1.AuthGuard)("twitter")),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", []),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"twitterAuth",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("twitter/callback"),
							(0, common_1.UseGuards)((0, passport_1.AuthGuard)("twitter")),
							tslib_1.__param(0, (0, common_1.Req)()),
							tslib_1.__param(1, (0, common_1.Res)({ passthrough: !0 })),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								Object,
								"function" == typeof (_f = void 0 !== express_1.Response && express_1.Response)
									? _f
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"twitterAuthRedirect",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.UseGuards)(guards_1.JwtRtGuard),
							(0, common_1.Get)("refresh"),
							tslib_1.__param(0, (0, common_1.Req)()),
							tslib_1.__param(1, (0, common_1.Res)({ passthrough: !0 })),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" == typeof (_g = void 0 !== express_1.Request && express_1.Request)
									? _g
									: Object,
								"function" == typeof (_h = void 0 !== express_1.Response && express_1.Response)
									? _h
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"refresh",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("logout"),
							tslib_1.__param(0, (0, common_1.Res)({ passthrough: !0 })),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" == typeof (_j = void 0 !== express_1.Response && express_1.Response)
									? _j
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						AuthController.prototype,
						"logout",
						null
					),
					(AuthController = tslib_1.__decorate(
						[
							(0, common_1.Controller)("auth"),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_k = void 0 !== auth_service_1.AuthService && auth_service_1.AuthService)
									? _k
									: Object,
							]),
						],
						AuthController
					)),
					(exports.AuthController = AuthController)
			},
			2611: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.AuthModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					token_module_1 = __webpack_require__(9673),
					auth_controller_1 = __webpack_require__(9335),
					auth_service_1 = __webpack_require__(9946),
					strategies_1 = __webpack_require__(7979)
				let AuthModule = class AuthModule {}
				;(AuthModule = tslib_1.__decorate(
					[
						(0, common_1.Module)({
							imports: [token_module_1.TokenModule],
							controllers: [auth_controller_1.AuthController],
							providers: [
								auth_service_1.AuthService,
								strategies_1.JwtStrategy,
								strategies_1.JwtRtStrategy,
								strategies_1.GoogleStrategy,
								strategies_1.TwitterStrategy,
							],
						}),
					],
					AuthModule
				)),
					(exports.AuthModule = AuthModule)
			},
			9946: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a, _b
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.AuthService = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					client_1 = __webpack_require__(3524),
					bcrypt = __webpack_require__(8432),
					prisma_service_1 = __webpack_require__(4755),
					token_service_1 = __webpack_require__(5862)
				let AuthService = class AuthService {
					constructor(prismaService, tokenService) {
						;(this.prismaService = prismaService), (this.tokenService = tokenService)
					}
					signup(dto) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const hashedPassword = yield bcrypt.hash(dto.password, 10)
							try {
								const user = yield this.prismaService.user.create({
										data: { username: dto.username, email: dto.email, password: hashedPassword },
									}),
									tokens = yield this.tokenService.generateTokens({ id: user.id })
								return (
									yield this.tokenService.saveTokens({
										userId: user.id,
										refreshToken: tokens.refreshToken,
									}),
									Object.assign(Object.assign({}, tokens), { user })
								)
							} catch (e) {
								if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && "P2002" === e.code)
									throw new common_1.BadRequestException({
										status: common_1.HttpStatus.BAD_REQUEST,
										errors: { e },
									})
							}
						})
					}
					signin(dto) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const user = yield this.prismaService.user.findUnique({
								where: { email: dto.email },
								include: {
									comments: { select: { id: !0, postId: !0 } },
									posts: { select: { id: !0, userId: !0 } },
									subRedditsOwner: { select: { id: !0 } },
									Vote: { select: { id: !0, postId: !0, value: !0 } },
									Likes: { select: { id: !0, commentId: !0 } },
									SubscribedSubReddits: { select: { id: !0, subRedditId: !0 } },
								},
							})
							if (!user) throw new common_1.BadRequestException("email or password is incorrect")
							if (!(yield bcrypt.compare(dto.password, user.password)))
								throw new common_1.BadRequestException("email or password is incorrect")
							const { refreshToken, accessToken } = yield this.tokenService.generateTokens({
								id: user.id,
							})
							return (
								yield this.tokenService.saveTokens({ userId: user.id, refreshToken }),
								{ user, refreshToken, accessToken }
							)
						})
					}
					refresh(req) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const { user } = req,
								tokens = yield this.tokenService.generateTokens({ id: user.id }),
								userData = yield this.tokenService.saveTokens({
									userId: user.id,
									refreshToken: tokens.refreshToken,
								})
							return Object.assign(Object.assign({}, userData), { accessToken: tokens.accessToken })
						})
					}
					socialLogin(req) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							if (!req.user) throw new common_1.BadRequestException("user is required")
							const { email, name } = req.user,
								user = yield this.prismaService.user.findUnique({ where: { email } })
							let statedUser
							statedUser =
								user ||
								(yield this.prismaService.user.create({
									data: { email, username: name, password: "" },
								}))
							const tokens = yield this.tokenService.generateTokens({ id: statedUser.id })
							return (
								yield this.tokenService.saveTokens({
									userId: statedUser.id,
									refreshToken: tokens.refreshToken,
								}),
								Object.assign(Object.assign({}, tokens), { user: statedUser })
							)
						})
					}
				}
				;(AuthService = tslib_1.__decorate(
					[
						(0, common_1.Injectable)(),
						tslib_1.__metadata("design:paramtypes", [
							"function" ==
							typeof (_a = void 0 !== prisma_service_1.PrismaService && prisma_service_1.PrismaService)
								? _a
								: Object,
							"function" ==
							typeof (_b = void 0 !== token_service_1.TokenService && token_service_1.TokenService)
								? _b
								: Object,
						]),
					],
					AuthService
				)),
					(exports.AuthService = AuthService)
			},
			456: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }),
					(exports.AuthSignInDto = exports.AuthSignUpDto = void 0)
				const tslib_1 = __webpack_require__(752),
					class_validator_1 = __webpack_require__(5849)
				class AuthSignUpDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsEmail)(),
						(0, class_validator_1.IsNotEmpty)(),
						tslib_1.__metadata("design:type", String),
					],
					AuthSignUpDto.prototype,
					"email",
					void 0
				),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsNotEmpty)(),
							(0, class_validator_1.IsString)(),
							(0, class_validator_1.Length)(8),
							tslib_1.__metadata("design:type", String),
						],
						AuthSignUpDto.prototype,
						"password",
						void 0
					),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsNotEmpty)(),
							(0, class_validator_1.IsString)(),
							tslib_1.__metadata("design:type", String),
						],
						AuthSignUpDto.prototype,
						"username",
						void 0
					),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsNotEmpty)(),
							(0, class_validator_1.IsString)(),
							tslib_1.__metadata("design:type", String),
						],
						AuthSignUpDto.prototype,
						"captcha",
						void 0
					),
					(exports.AuthSignUpDto = AuthSignUpDto)
				class AuthSignInDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsEmail)(),
						(0, class_validator_1.IsNotEmpty)(),
						tslib_1.__metadata("design:type", String),
					],
					AuthSignInDto.prototype,
					"email",
					void 0
				),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsNotEmpty)(),
							(0, class_validator_1.IsString)(),
							(0, class_validator_1.Length)(8),
							tslib_1.__metadata("design:type", String),
						],
						AuthSignInDto.prototype,
						"password",
						void 0
					),
					(exports.AuthSignInDto = AuthSignInDto)
			},
			4088: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 })
				const tslib_1 = __webpack_require__(752)
				tslib_1.__exportStar(__webpack_require__(1226), exports),
					tslib_1.__exportStar(__webpack_require__(5865), exports)
			},
			1226: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.JwtAuthGuard = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340)
				let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {}
				;(JwtAuthGuard = tslib_1.__decorate([(0, common_1.Injectable)()], JwtAuthGuard)),
					(exports.JwtAuthGuard = JwtAuthGuard)
			},
			5865: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.JwtRtGuard = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340)
				let JwtRtGuard = class JwtRtGuard extends (0, passport_1.AuthGuard)("jwtRt") {}
				;(JwtRtGuard = tslib_1.__decorate([(0, common_1.Injectable)()], JwtRtGuard)),
					(exports.JwtRtGuard = JwtRtGuard)
			},
			6434: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.GoogleStrategy = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340),
					passport_google_oauth20_1 = __webpack_require__(4743)
				let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(
					passport_google_oauth20_1.Strategy,
					"google"
				) {
					constructor() {
						super({
							clientID: process.env.GOOGLE_AUTH_ID,
							clientSecret: process.env.GOOGLE_AUTH_SECRET,
							callbackURL: "http://localhost:5000/auth/google/callback",
							scope: ["profile", "email"],
						})
					}
					validate(accessToken, refreshToken, profile, done) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const { name, emails } = profile,
								user = { email: emails[0].value, name: name.givenName }
							done(null, user)
						})
					}
				}
				;(GoogleStrategy = tslib_1.__decorate(
					[(0, common_1.Injectable)(), tslib_1.__metadata("design:paramtypes", [])],
					GoogleStrategy
				)),
					(exports.GoogleStrategy = GoogleStrategy)
			},
			7979: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 })
				const tslib_1 = __webpack_require__(752)
				tslib_1.__exportStar(__webpack_require__(6434), exports),
					tslib_1.__exportStar(__webpack_require__(4584), exports),
					tslib_1.__exportStar(__webpack_require__(7023), exports),
					tslib_1.__exportStar(__webpack_require__(1963), exports)
			},
			4584: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.JwtStrategy = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340),
					passport_jwt_1 = __webpack_require__(136)
				let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(
					passport_jwt_1.Strategy,
					"jwt"
				) {
					constructor() {
						super({
							jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
							ignoreExpiration: !1,
							secretOrKey: process.env.JWT_ACCESS,
						})
					}
					validate(payload) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return Object.assign({}, payload)
						})
					}
				}
				;(JwtStrategy = tslib_1.__decorate(
					[(0, common_1.Injectable)(), tslib_1.__metadata("design:paramtypes", [])],
					JwtStrategy
				)),
					(exports.JwtStrategy = JwtStrategy)
			},
			7023: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.JwtRtStrategy = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340),
					passport_jwt_1 = __webpack_require__(136)
				let JwtRtStrategy = class JwtRtStrategy extends (0, passport_1.PassportStrategy)(
					passport_jwt_1.Strategy,
					"jwtRt"
				) {
					constructor() {
						super({
							jwtFromRequest: cookieExtractor,
							ignoreExpiration: !1,
							secretOrKey: process.env.JWT_REFRESH,
						})
					}
					validate(payload) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return Object.assign({}, payload)
						})
					}
				}
				;(JwtRtStrategy = tslib_1.__decorate(
					[(0, common_1.Injectable)(), tslib_1.__metadata("design:paramtypes", [])],
					JwtRtStrategy
				)),
					(exports.JwtRtStrategy = JwtRtStrategy)
				const cookieExtractor = function (req) {
					let token = null
					return req && req.cookies && (token = req.cookies.refreshToken), token
				}
			},
			1963: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.TwitterStrategy = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					passport_1 = __webpack_require__(4340),
					passport_twitter_1 = __webpack_require__(8034)
				let TwitterStrategy = class TwitterStrategy extends (0, passport_1.PassportStrategy)(
					passport_twitter_1.Strategy,
					"twitter"
				) {
					constructor() {
						super({
							consumerKey: process.env.TWITTER_AUTH_ID,
							consumerSecret: process.env.TWITTER_AUTH_SECRET,
							callbackURL: "http://localhost:5000/auth/twitter/callback",
							passReqToCallback: !0,
							includeEmail: !0,
							skipExtendedUserProfile: !1,
						})
					}
					validate(req, accessToken, refreshToken, profile, cb) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const { displayName, emails } = profile,
								user = { email: emails[0].value, name: displayName }
							return cb(null, user)
						})
					}
				}
				;(TwitterStrategy = tslib_1.__decorate(
					[(0, common_1.Injectable)(), tslib_1.__metadata("design:paramtypes", [])],
					TwitterStrategy
				)),
					(exports.TwitterStrategy = TwitterStrategy)
			},
			7713: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.CommunityController = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					platform_express_1 = __webpack_require__(6188),
					guards_1 = __webpack_require__(4088),
					types_1 = __webpack_require__(2995),
					cloudinary_1 = __webpack_require__(5870),
					multer_1 = __webpack_require__(9635),
					community_service_1 = __webpack_require__(4801),
					community_dto_1 = __webpack_require__(2371)
				let CommunityController = class CommunityController {
					constructor(communityService) {
						this.communityService = communityService
					}
					createCommunity(body, req) {
						return this.communityService.createCommunity(body.title, req.user.id)
					}
					updateCommunityImage(files, body) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const { secure_url } = yield cloudinary_1.cloudinary.upload(files[0].path, {
								folder: "community",
							})
							return this.communityService.updateImage(body.subRedditId, secure_url)
						})
					}
					subscribe(req, body) {
						return this.communityService.subscribe(body.subRedditId, req.user.id)
					}
					unsubscribe(req, body) {
						return this.communityService.unsubscribe(body.subRedditId, req.user.id)
					}
				}
				tslib_1.__decorate(
					[
						(0, common_1.Post)("create"),
						tslib_1.__param(0, (0, common_1.Body)()),
						tslib_1.__param(1, (0, common_1.Req)()),
						tslib_1.__metadata("design:type", Function),
						tslib_1.__metadata("design:paramtypes", [
							"function" ==
							typeof (_a = void 0 !== community_dto_1.CommunityDto && community_dto_1.CommunityDto)
								? _a
								: Object,
							"function" == typeof (_b = void 0 !== types_1.IRequest && types_1.IRequest) ? _b : Object,
						]),
						tslib_1.__metadata("design:returntype", void 0),
					],
					CommunityController.prototype,
					"createCommunity",
					null
				),
					tslib_1.__decorate(
						[
							(0, common_1.Put)("image"),
							(0, common_1.UseInterceptors)(
								(0, platform_express_1.FilesInterceptor)("file", 1, { storage: multer_1.multerStorage })
							),
							tslib_1.__param(0, (0, common_1.UploadedFiles)()),
							tslib_1.__param(1, (0, common_1.Body)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_d =
									"undefined" != typeof Express && void 0 !== (_c = Express.Multer) && _c.File)
									? _d
									: Object,
								"function" ==
								typeof (_e =
									void 0 !== community_dto_1.CommunityImageDto && community_dto_1.CommunityImageDto)
									? _e
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						CommunityController.prototype,
						"updateCommunityImage",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Patch)("subscribe"),
							tslib_1.__param(0, (0, common_1.Req)()),
							tslib_1.__param(1, (0, common_1.Body)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" == typeof (_f = void 0 !== types_1.IRequest && types_1.IRequest)
									? _f
									: Object,
								"function" ==
								typeof (_g =
									void 0 !== community_dto_1.CommunitySubscriptionDto &&
									community_dto_1.CommunitySubscriptionDto)
									? _g
									: Object,
							]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						CommunityController.prototype,
						"subscribe",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Patch)("unsubscribe"),
							tslib_1.__param(0, (0, common_1.Req)()),
							tslib_1.__param(1, (0, common_1.Body)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" == typeof (_h = void 0 !== types_1.IRequest && types_1.IRequest)
									? _h
									: Object,
								"function" ==
								typeof (_j =
									void 0 !== community_dto_1.CommunitySubscriptionDto &&
									community_dto_1.CommunitySubscriptionDto)
									? _j
									: Object,
							]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						CommunityController.prototype,
						"unsubscribe",
						null
					),
					(CommunityController = tslib_1.__decorate(
						[
							(0, common_1.Controller)("community"),
							(0, common_1.UseGuards)(guards_1.JwtAuthGuard),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_k =
									void 0 !== community_service_1.CommunityService &&
									community_service_1.CommunityService)
									? _k
									: Object,
							]),
						],
						CommunityController
					)),
					(exports.CommunityController = CommunityController)
			},
			1374: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.CommunityModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					community_controller_1 = __webpack_require__(7713),
					community_p_1 = __webpack_require__(4843),
					community_service_1 = __webpack_require__(4801)
				let CommunityModule = class CommunityModule {}
				;(CommunityModule = tslib_1.__decorate(
					[
						(0, common_1.Module)({
							controllers: [community_controller_1.CommunityController, community_p_1.CommunityP],
							providers: [community_service_1.CommunityService],
						}),
					],
					CommunityModule
				)),
					(exports.CommunityModule = CommunityModule)
			},
			4843: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.CommunityP = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					community_service_1 = __webpack_require__(4801)
				let CommunityP = class CommunityP {
					constructor(communityService) {
						this.communityService = communityService
					}
					getCommunityInfo(title) {
						return this.communityService.getCommunityInfo(title)
					}
					getPopularCommunitiesAll() {
						return this.communityService.getPopularCommunitiesAll()
					}
					getPopularCommunities() {
						return this.communityService.getPopularCommunities()
					}
					getCommunityByTitle(body) {
						return this.communityService.getCommunityByTitle(body.title)
					}
				}
				tslib_1.__decorate(
					[
						(0, common_1.Get)("info"),
						tslib_1.__param(0, (0, common_1.Query)("title")),
						tslib_1.__metadata("design:type", Function),
						tslib_1.__metadata("design:paramtypes", [Object]),
						tslib_1.__metadata("design:returntype", void 0),
					],
					CommunityP.prototype,
					"getCommunityInfo",
					null
				),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("popular-all"),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", []),
							tslib_1.__metadata("design:returntype", void 0),
						],
						CommunityP.prototype,
						"getPopularCommunitiesAll",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("popular"),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", []),
							tslib_1.__metadata("design:returntype", void 0),
						],
						CommunityP.prototype,
						"getPopularCommunities",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Post)("bytitle"),
							tslib_1.__param(0, (0, common_1.Body)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [Object]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						CommunityP.prototype,
						"getCommunityByTitle",
						null
					),
					(CommunityP = tslib_1.__decorate(
						[
							(0, common_1.Controller)("communityP"),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_a =
									void 0 !== community_service_1.CommunityService &&
									community_service_1.CommunityService)
									? _a
									: Object,
							]),
						],
						CommunityP
					)),
					(exports.CommunityP = CommunityP)
			},
			4801: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.CommunityService = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					prisma_service_1 = __webpack_require__(4755)
				let CommunityService = class CommunityService {
					constructor(prismaService) {
						this.prismaService = prismaService
					}
					getCommunityInfo(title) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const data = yield this.prismaService.subReddit.findUnique({ where: { title } })
							if (!data) throw new common_1.BadRequestException("Community not found")
							return data
						})
					}
					getPopularCommunities() {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return this.prismaService.subReddit.findMany({ orderBy: { subscribers: "desc" }, take: 5 })
						})
					}
					getPopularCommunitiesAll() {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return this.prismaService.subReddit.findMany({ take: 50, orderBy: { subscribers: "desc" } })
						})
					}
					getCommunityByTitle(title) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return this.prismaService.subReddit.findMany({
								where: { title: { contains: title, mode: "insensitive" } },
								include: { subscribedUsers: !0 },
							})
						})
					}
					createCommunity(title, userId) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							try {
								const communityData = yield this.prismaService.subReddit.create({
										data: { title, owner: { connect: { id: userId } } },
									}),
									revalidatePage = yield fetch(
										`${process.env.FRONTEND_BASE_URL}/api/revalidate?secret=${process.env.REVALIDATE_PAGE}`
									)
								yield revalidatePage.json()
								return { communityData, subscription: yield this.subscribe(communityData.id, userId) }
							} catch (error) {
								throw new common_1.BadRequestException("Community already exists")
							}
						})
					}
					updateImage(subRedditId, imagePath) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return yield this.prismaService.subReddit.update({
								where: { id: subRedditId },
								data: { image: imagePath },
							})
						})
					}
					subscribe(subRedditId, userId) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const isSubscribed = yield this.prismaService.subscribedSubReddits.findMany({
								where: { subRedditId, AND: { userId } },
							})
							if (isSubscribed.length > 0) return isSubscribed[0]
							return {
								community: yield this.prismaService.subReddit.update({
									where: { id: subRedditId },
									data: { subscribers: { increment: 1 } },
								}),
								subscribedUsers: yield this.prismaService.subscribedSubReddits.create({
									data: { subRedditId, userId },
								}),
							}
						})
					}
					unsubscribe(subRedditId, userId) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return {
								community: yield this.prismaService.subReddit.update({
									where: { id: subRedditId },
									data: { subscribers: { decrement: 1 } },
								}),
								subscribedUsers: yield this.prismaService.subscribedSubReddits.deleteMany({
									where: { subRedditId, AND: { userId } },
								}),
							}
						})
					}
				}
				;(CommunityService = tslib_1.__decorate(
					[
						(0, common_1.Injectable)(),
						tslib_1.__metadata("design:paramtypes", [
							"function" ==
							typeof (_a = void 0 !== prisma_service_1.PrismaService && prisma_service_1.PrismaService)
								? _a
								: Object,
						]),
					],
					CommunityService
				)),
					(exports.CommunityService = CommunityService)
			},
			2371: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }),
					(exports.CommunitySubscriptionDto =
						exports.CommunityImageDto =
						exports.CommunityServiceDto =
						exports.CommunityDto =
							void 0)
				const tslib_1 = __webpack_require__(752),
					class_transformer_1 = __webpack_require__(4004),
					class_validator_1 = __webpack_require__(5849)
				class CommunityDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsNotEmpty)(),
						(0, class_validator_1.IsString)(),
						(0, class_validator_1.Length)(1, 21),
						tslib_1.__metadata("design:type", String),
					],
					CommunityDto.prototype,
					"title",
					void 0
				),
					(exports.CommunityDto = CommunityDto)
				class CommunityServiceDto extends CommunityDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsNotEmpty)(),
						(0, class_validator_1.IsNumber)(),
						tslib_1.__metadata("design:type", Number),
					],
					CommunityServiceDto.prototype,
					"id",
					void 0
				),
					(exports.CommunityServiceDto = CommunityServiceDto)
				class CommunityImageDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsNotEmpty)(),
						(0, class_validator_1.IsNumber)(),
						(0, class_transformer_1.Type)(() => Number),
						tslib_1.__metadata("design:type", Number),
					],
					CommunityImageDto.prototype,
					"subRedditId",
					void 0
				),
					(exports.CommunityImageDto = CommunityImageDto)
				class CommunitySubscriptionDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsNotEmpty)(),
						(0, class_validator_1.IsNumber)(),
						tslib_1.__metadata("design:type", Number),
					],
					CommunitySubscriptionDto.prototype,
					"subRedditId",
					void 0
				),
					(exports.CommunitySubscriptionDto = CommunitySubscriptionDto)
			},
			3881: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PostDto = void 0)
				const tslib_1 = __webpack_require__(752),
					class_validator_1 = __webpack_require__(5849)
				var PostType
				!(function (PostType) {
					;(PostType.USER = "USER"), (PostType.SUBREDDIT = "SUBREDDIT")
				})(PostType || (PostType = {}))
				class PostDto {}
				tslib_1.__decorate(
					[
						(0, class_validator_1.IsString)(),
						(0, class_validator_1.IsNotEmpty)(),
						tslib_1.__metadata("design:type", String),
					],
					PostDto.prototype,
					"title",
					void 0
				),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsString)(),
							(0, class_validator_1.IsNotEmpty)(),
							tslib_1.__metadata("design:type", String),
						],
						PostDto.prototype,
						"body",
						void 0
					),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsOptional)(),
							(0, class_validator_1.IsNumber)(),
							tslib_1.__metadata("design:type", Number),
						],
						PostDto.prototype,
						"subRedditId",
						void 0
					),
					tslib_1.__decorate(
						[
							(0, class_validator_1.IsEnum)(PostType),
							(0, class_validator_1.IsNotEmpty)(),
							tslib_1.__metadata("design:type", String),
						],
						PostDto.prototype,
						"type",
						void 0
					),
					(exports.PostDto = PostDto)
			},
			1635: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a, _b, _c, _d, _e, _f, _g, _h, _j
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PostController = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					platform_express_1 = __webpack_require__(6188),
					guards_1 = __webpack_require__(4088),
					types_1 = __webpack_require__(2995),
					cloudinary_1 = __webpack_require__(5870),
					multer_1 = __webpack_require__(9635),
					post_dto_1 = __webpack_require__(3881),
					post_service_1 = __webpack_require__(4350)
				let PostController = class PostController {
					constructor(postService) {
						this.postService = postService
					}
					getAllPosts(request, cursor) {
						return this.postService.getAllUserPosts(request.user.id, cursor)
					}
					uploadImage(file) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const { secure_url } = yield cloudinary_1.cloudinary.upload(file.path, { folder: "post" })
							return secure_url
						})
					}
					createPost(body, req) {
						return this.postService.createPost(
							Object.assign(Object.assign({}, body), { userId: req.user.id })
						)
					}
					togglePost(body, req) {
						return "boolean" == typeof body.vote
							? this.postService.tooglePost(body.postId, req.user.id, body.vote, body.voteId)
							: this.postService.deleteToogleVote(body.postId, body.voteId, req.user.id)
					}
					comment(body, req) {
						return this.postService.writeComment(
							Object.assign(Object.assign({}, body), { userId: req.user.id })
						)
					}
					rate(body, req) {
						return body.rateId
							? this.postService.deleteRateComment(
									Object.assign(Object.assign({}, body), { rateId: body.rateId, userId: req.user.id })
							  )
							: this.postService.rateComment(
									Object.assign(Object.assign({}, body), { userId: req.user.id })
							  )
					}
				}
				tslib_1.__decorate(
					[
						(0, common_1.Get)("all"),
						tslib_1.__param(0, (0, common_1.Req)()),
						tslib_1.__param(1, (0, common_1.Query)("cursor")),
						tslib_1.__metadata("design:type", Function),
						tslib_1.__metadata("design:paramtypes", [
							"function" == typeof (_a = void 0 !== types_1.IRequest && types_1.IRequest) ? _a : Object,
							Number,
						]),
						tslib_1.__metadata("design:returntype", void 0),
					],
					PostController.prototype,
					"getAllPosts",
					null
				),
					tslib_1.__decorate(
						[
							(0, common_1.Put)("image"),
							(0, common_1.UseInterceptors)(
								(0, platform_express_1.FileInterceptor)("file", { storage: multer_1.multerStorage })
							),
							tslib_1.__param(0, (0, common_1.UploadedFile)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_c =
									"undefined" != typeof Express && void 0 !== (_b = Express.Multer) && _b.File)
									? _c
									: Object,
							]),
							tslib_1.__metadata("design:returntype", Promise),
						],
						PostController.prototype,
						"uploadImage",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Post)("create"),
							tslib_1.__param(0, (0, common_1.Body)()),
							tslib_1.__param(1, (0, common_1.Req)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								"function" == typeof (_d = void 0 !== post_dto_1.PostDto && post_dto_1.PostDto)
									? _d
									: Object,
								"function" == typeof (_e = void 0 !== types_1.IRequest && types_1.IRequest)
									? _e
									: Object,
							]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						PostController.prototype,
						"createPost",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Patch)("toogle-vote"),
							tslib_1.__param(0, (0, common_1.Body)()),
							tslib_1.__param(1, (0, common_1.Req)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								Object,
								"function" == typeof (_f = void 0 !== types_1.IRequest && types_1.IRequest)
									? _f
									: Object,
							]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						PostController.prototype,
						"togglePost",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Post)("comment"),
							tslib_1.__param(0, (0, common_1.Body)()),
							tslib_1.__param(1, (0, common_1.Req)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								Object,
								"function" == typeof (_g = void 0 !== types_1.IRequest && types_1.IRequest)
									? _g
									: Object,
							]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						PostController.prototype,
						"comment",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Patch)("rate"),
							tslib_1.__param(0, (0, common_1.Body)()),
							tslib_1.__param(1, (0, common_1.Req)()),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [
								Object,
								"function" == typeof (_h = void 0 !== types_1.IRequest && types_1.IRequest)
									? _h
									: Object,
							]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						PostController.prototype,
						"rate",
						null
					),
					(PostController = tslib_1.__decorate(
						[
							(0, common_1.UseGuards)(guards_1.JwtAuthGuard),
							(0, common_1.Controller)("post"),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_j = void 0 !== post_service_1.PostService && post_service_1.PostService)
									? _j
									: Object,
							]),
						],
						PostController
					)),
					(exports.PostController = PostController)
			},
			204: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PostModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					post_controller_1 = __webpack_require__(1635),
					post_p_controller_1 = __webpack_require__(5106),
					post_service_1 = __webpack_require__(4350)
				let PostModule = class PostModule {}
				;(PostModule = tslib_1.__decorate(
					[
						(0, common_1.Module)({
							providers: [post_service_1.PostService],
							controllers: [post_controller_1.PostController, post_p_controller_1.PostPController],
						}),
					],
					PostModule
				)),
					(exports.PostModule = PostModule)
			},
			5106: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PostPController = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					post_service_1 = __webpack_require__(4350)
				let PostPController = class PostPController {
					constructor(postService) {
						this.postService = postService
					}
					getPost(postId) {
						return this.postService.getPost(postId)
					}
					getAllPosts(cursor) {
						return this.postService.getAllPosts(cursor)
					}
					getCommunityPosts(title, cursor) {
						return this.postService.getCommunityPosts(title, cursor)
					}
				}
				tslib_1.__decorate(
					[
						(0, common_1.Get)(),
						tslib_1.__param(0, (0, common_1.Query)("postId")),
						tslib_1.__metadata("design:type", Function),
						tslib_1.__metadata("design:paramtypes", [Number]),
						tslib_1.__metadata("design:returntype", void 0),
					],
					PostPController.prototype,
					"getPost",
					null
				),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("all"),
							tslib_1.__param(0, (0, common_1.Query)("cursor")),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [Number]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						PostPController.prototype,
						"getAllPosts",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("community"),
							tslib_1.__param(0, (0, common_1.Query)("title")),
							tslib_1.__param(1, (0, common_1.Query)("cursor")),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [Object, Number]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						PostPController.prototype,
						"getCommunityPosts",
						null
					),
					(PostPController = tslib_1.__decorate(
						[
							(0, common_1.Controller)("postP"),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_a = void 0 !== post_service_1.PostService && post_service_1.PostService)
									? _a
									: Object,
							]),
						],
						PostPController
					)),
					(exports.PostPController = PostPController)
			},
			4350: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PostService = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					prisma_service_1 = __webpack_require__(4755),
					prismaQuery_1 = __webpack_require__(4208)
				var PostType
				!(function (PostType) {
					;(PostType.USER = "USER"), (PostType.SUBREDDIT = "SUBREDDIT")
				})(PostType || (PostType = {}))
				let PostService = class PostService {
					constructor(prismaService) {
						this.prismaService = prismaService
					}
					getPost(postId) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return yield this.prismaService.post.findFirst({
								where: { id: postId },
								include: {
									user: prismaQuery_1.includeUserPost,
									subReddit: !0,
									comments: {
										orderBy: { createdAt: "desc" },
										include: { user: prismaQuery_1.includeUserPost, likes: !0 },
									},
									_count: { select: { comments: !0 } },
								},
							})
						})
					}
					getCommunityPosts(title, cursor) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							let result = null
							result = cursor
								? yield this.prismaService.post.findMany(
										Object.assign(Object.assign({}, (0, prismaQuery_1.communityPostQuery)(title)), {
											cursor: { id: cursor },
											skip: 1,
											orderBy: { createdAt: "desc" },
										})
								  )
								: yield this.prismaService.post.findMany(
										Object.assign(Object.assign({}, (0, prismaQuery_1.communityPostQuery)(title)), {
											orderBy: { createdAt: "desc" },
										})
								  )
							return { posts: result, cursor: 20 === result.length ? result[result.length - 1].id : null }
						})
					}
					getAllPosts(cursor) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							let result = null
							result = cursor
								? yield this.prismaService.post.findMany(
										Object.assign(Object.assign({}, (0, prismaQuery_1.getAllPostsQuery)(null)), {
											cursor: { id: cursor },
											skip: 1,
											orderBy: { createdAt: "desc" },
										})
								  )
								: yield this.prismaService.post.findMany(
										Object.assign(Object.assign({}, (0, prismaQuery_1.getAllPostsQuery)(null)), {
											orderBy: { createdAt: "desc" },
										})
								  )
							return { posts: result, cursor: 20 === result.length ? result[result.length - 1].id : null }
						})
					}
					getAllUserPosts(userId, cursor) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							let result = null
							result = cursor
								? yield this.prismaService.post.findMany(
										Object.assign(
											Object.assign({}, (0, prismaQuery_1.getAllUserPostsQuery)(userId)),
											{ cursor: { id: cursor }, skip: 1, orderBy: { createdAt: "desc" } }
										)
								  )
								: yield this.prismaService.post.findMany(
										Object.assign(
											Object.assign({}, (0, prismaQuery_1.getAllUserPostsQuery)(userId)),
											{ orderBy: { createdAt: "desc" } }
										)
								  )
							return { posts: result, cursor: 20 === result.length ? result[result.length - 1].id : null }
						})
					}
					createPost({ title, body, type, userId, subRedditId }) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return type === PostType.USER
								? yield this.prismaService.post.create({
										data: { title, text: body, user: { connect: { id: userId } } },
								  })
								: yield this.prismaService.post.create({
										data: {
											title,
											text: body,
											subReddit: { connect: { id: subRedditId } },
											user: { connect: { id: userId } },
										},
								  })
						})
					}
					tooglePost(postId, userId, voteType, voteId = 0) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const isToggled = yield this.prismaService.vote.findUnique({ where: { id: voteId } })
							return (
								yield this.prismaService.post.update({
									where: { id: postId },
									data: {
										totalVotes:
											isToggled && isToggled.value
												? { decrement: 2 }
												: isToggled && !isToggled.value
												? { increment: 2 }
												: voteType
												? { increment: 1 }
												: { decrement: 1 },
										vote: {
											upsert: {
												where: { id: voteId },
												create: { user: { connect: { id: userId } }, value: voteType },
												update: { value: voteType },
											},
										},
									},
									select: prismaQuery_1.selectUserPostQuery,
								}),
								this.prismaService.user.findUnique({ where: { id: userId }, select: { Vote: !0 } })
							)
						})
					}
					deleteToogleVote(postId, voteId, userId) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const result = yield this.prismaService.vote.findUnique({ where: { id: voteId } })
							return (
								yield this.prismaService.post.update({
									where: { id: postId },
									data: {
										totalVotes: result.value ? { decrement: 1 } : { increment: 1 },
										vote: { delete: { id: voteId } },
									},
									select: prismaQuery_1.selectUserPostQuery,
								}),
								this.prismaService.user.findUnique({ where: { id: userId }, select: { Vote: !0 } })
							)
						})
					}
					writeComment({ userId, postId, comment }) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return this.prismaService.comment.create({
								data: {
									text: comment,
									user: { connect: { id: userId } },
									post: { connect: { id: postId } },
								},
								include: { user: { select: { id: !0, username: !0, createdAt: !0 } }, likes: !0 },
							})
						})
					}
					rateComment({ userId, commentId }) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return (
								yield this.prismaService.comment.update({
									where: { id: commentId },
									data: {
										like: { increment: 1 },
										likes: { create: { user: { connect: { id: userId } } } },
									},
								}),
								this.prismaService.user.findUnique(
									Object.assign({}, (0, prismaQuery_1.includeCommentQueryPrisma)(userId))
								)
							)
						})
					}
					deleteRateComment({ commentId, rateId, userId }) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return (
								yield this.prismaService.comment.update({
									where: { id: commentId },
									data: { like: { decrement: 1 }, likes: { delete: { id: rateId } } },
								}),
								this.prismaService.user.findUnique(
									Object.assign({}, (0, prismaQuery_1.includeCommentQueryPrisma)(userId))
								)
							)
						})
					}
				}
				;(PostService = tslib_1.__decorate(
					[
						(0, common_1.Injectable)(),
						tslib_1.__metadata("design:paramtypes", [
							"function" ==
							typeof (_a = void 0 !== prisma_service_1.PrismaService && prisma_service_1.PrismaService)
								? _a
								: Object,
						]),
					],
					PostService
				)),
					(exports.PostService = PostService)
			},
			4208: (__unused_webpack_module, exports) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }),
					(exports.getAllUserPostsQuery =
						exports.getAllPostsQuery =
						exports.communityPostQuery =
						exports.includeUserPost =
						exports.selectUserPostQuery =
						exports.includeCommentQueryPrisma =
						exports.includeQueryPrisma =
							void 0),
					(exports.includeQueryPrisma = {
						user: { select: { id: !0, username: !0, createdAt: !0 } },
						subReddit: !0,
						_count: { select: { comments: !0 } },
					})
				;(exports.includeCommentQueryPrisma = (id) => ({ where: { id }, select: { Likes: !0 } })),
					(exports.selectUserPostQuery = {
						user: { select: { Vote: { select: { id: !0, value: !0, postId: !0, userId: !0 } } } },
					}),
					(exports.includeUserPost = { select: { id: !0, username: !0, createdAt: !0 } })
				exports.communityPostQuery = (title) => ({
					where: { subReddit: { title } },
					take: 20,
					include: exports.includeQueryPrisma,
				})
				exports.getAllPostsQuery = (id) => ({
					where: { NOT: { subRedditId: id } },
					take: 20,
					include: exports.includeQueryPrisma,
				})
				exports.getAllUserPostsQuery = (userId) => ({
					where: { NOT: { subRedditId: null }, subReddit: { subscribedUsers: { some: { userId } } } },
					take: 20,
					include: exports.includeQueryPrisma,
				})
			},
			3809: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PrismaModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					prisma_service_1 = __webpack_require__(4755)
				let PrismaModule = class PrismaModule {}
				;(PrismaModule = tslib_1.__decorate(
					[
						(0, common_1.Global)(),
						(0, common_1.Module)({
							providers: [prisma_service_1.PrismaService],
							exports: [prisma_service_1.PrismaService],
						}),
					],
					PrismaModule
				)),
					(exports.PrismaModule = PrismaModule)
			},
			4755: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.PrismaService = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					client_1 = __webpack_require__(3524)
				let PrismaService = class PrismaService extends client_1.PrismaClient {}
				;(PrismaService = tslib_1.__decorate([(0, common_1.Injectable)()], PrismaService)),
					(exports.PrismaService = PrismaService)
			},
			9673: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.TokenModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					jwt_1 = __webpack_require__(2064),
					prisma_module_1 = __webpack_require__(3809),
					token_service_1 = __webpack_require__(5862)
				let TokenModule = class TokenModule {}
				;(TokenModule = tslib_1.__decorate(
					[
						(0, common_1.Module)({
							imports: [jwt_1.JwtModule.register({}), prisma_module_1.PrismaModule],
							providers: [token_service_1.TokenService],
							exports: [token_service_1.TokenService],
						}),
					],
					TokenModule
				)),
					(exports.TokenModule = TokenModule)
			},
			5862: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a, _b
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.TokenService = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					jwt_1 = __webpack_require__(2064),
					prisma_service_1 = __webpack_require__(4755)
				let TokenService = class TokenService {
					constructor(jwtService, prismaService) {
						;(this.jwtService = jwtService), (this.prismaService = prismaService)
					}
					generateTokens(payload) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							return {
								refreshToken: yield this.jwtService.signAsync(payload, {
									secret: process.env.JWT_REFRESH,
									expiresIn: "30d",
								}),
								accessToken: yield this.jwtService.signAsync(payload, {
									secret: process.env.JWT_ACCESS,
									expiresIn: "30d",
								}),
							}
						})
					}
					saveTokens({ userId, refreshToken }) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							const tokenData = yield this.prismaService.token.findFirst({ where: { userId } }),
								user = yield this.prismaService.user.findFirst({
									where: { id: userId },
									include: {
										comments: !0,
										posts: !0,
										subRedditsOwner: !0,
										Vote: !0,
										Likes: !0,
										SubscribedSubReddits: {
											include: { subReddit: { select: { image: !0, title: !0 } } },
										},
									},
								})
							if (tokenData) {
								return {
									refreshToken: (yield this.prismaService.token.update({
										where: { id: tokenData.id },
										data: { token: refreshToken },
									})).token,
									user,
								}
							}
							return {
								refreshToken: (yield this.prismaService.token.create({
									data: { token: refreshToken, userId },
									select: { token: !0 },
								})).token,
								user,
							}
						})
					}
					validateRefreshToken(refreshToken) {
						try {
							return this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH })
						} catch (error) {
							return null
						}
					}
				}
				;(TokenService = tslib_1.__decorate(
					[
						(0, common_1.Injectable)(),
						tslib_1.__metadata("design:paramtypes", [
							"function" == typeof (_a = void 0 !== jwt_1.JwtService && jwt_1.JwtService) ? _a : Object,
							"function" ==
							typeof (_b = void 0 !== prisma_service_1.PrismaService && prisma_service_1.PrismaService)
								? _b
								: Object,
						]),
					],
					TokenService
				)),
					(exports.TokenService = TokenService)
			},
			2995: (__unused_webpack_module, exports) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 })
			},
			9347: (__unused_webpack_module, exports) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.getUserPostsQuery = void 0)
				exports.getUserPostsQuery = (username) => ({
					where: { user: { username } },
					include: { subReddit: !0, comments: !0, user: !0, _count: { select: { comments: !0 } } },
					take: 20,
				})
			},
			7393: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a, _b
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.UserController = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					user_service_1 = __webpack_require__(9426),
					Express_1 = __webpack_require__(6235)
				let UserController = class UserController {
					constructor(userService) {
						this.userService = userService
					}
					test(res) {
						return res.json({ hello: "hello" })
					}
					getUserInfo(username) {
						return this.userService.getUserInfo(username)
					}
					getUserPosts(username, cursor) {
						return this.userService.getUserPosts(username, cursor)
					}
				}
				tslib_1.__decorate(
					[
						(0, common_1.Get)("test"),
						tslib_1.__param(0, (0, common_1.Res)()),
						tslib_1.__metadata("design:type", Function),
						tslib_1.__metadata("design:paramtypes", [
							"function" == typeof (_a = void 0 !== Express_1.Response && Express_1.Response)
								? _a
								: Object,
						]),
						tslib_1.__metadata("design:returntype", void 0),
					],
					UserController.prototype,
					"test",
					null
				),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("info"),
							tslib_1.__param(0, (0, common_1.Query)("username")),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [Object]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						UserController.prototype,
						"getUserInfo",
						null
					),
					tslib_1.__decorate(
						[
							(0, common_1.Get)("posts"),
							tslib_1.__param(0, (0, common_1.Query)("username")),
							tslib_1.__param(1, (0, common_1.Query)("cursor")),
							tslib_1.__metadata("design:type", Function),
							tslib_1.__metadata("design:paramtypes", [Object, Number]),
							tslib_1.__metadata("design:returntype", void 0),
						],
						UserController.prototype,
						"getUserPosts",
						null
					),
					(UserController = tslib_1.__decorate(
						[
							(0, common_1.Controller)("user"),
							tslib_1.__metadata("design:paramtypes", [
								"function" ==
								typeof (_b = void 0 !== user_service_1.UserService && user_service_1.UserService)
									? _b
									: Object,
							]),
						],
						UserController
					)),
					(exports.UserController = UserController)
			},
			9082: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.UserModule = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					user_controller_1 = __webpack_require__(7393),
					user_service_1 = __webpack_require__(9426)
				let UserModule = class UserModule {}
				;(UserModule = tslib_1.__decorate(
					[
						(0, common_1.Module)({
							controllers: [user_controller_1.UserController],
							providers: [user_service_1.UserService],
						}),
					],
					UserModule
				)),
					(exports.UserModule = UserModule)
			},
			9426: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				var _a
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.UserService = void 0)
				const tslib_1 = __webpack_require__(752),
					common_1 = __webpack_require__(6481),
					prisma_service_1 = __webpack_require__(4755),
					prismaQuery_1 = __webpack_require__(9347)
				let UserService = class UserService {
					constructor(prismaService) {
						this.prismaService = prismaService
					}
					getUserInfo(username) {
						return this.prismaService.user.findUnique({
							where: { username },
							select: { id: !0, username: !0, createdAt: !0 },
						})
					}
					getUserPosts(username, cursor) {
						return tslib_1.__awaiter(this, void 0, void 0, function* () {
							let result = null
							result = cursor
								? yield this.prismaService.post.findMany(
										Object.assign(
											Object.assign({}, (0, prismaQuery_1.getUserPostsQuery)(username)),
											{ cursor: { id: cursor }, skip: 1, orderBy: { createdAt: "desc" } }
										)
								  )
								: yield this.prismaService.post.findMany(
										Object.assign(
											Object.assign({}, (0, prismaQuery_1.getUserPostsQuery)(username)),
											{ orderBy: { createdAt: "desc" } }
										)
								  )
							return { posts: result, cursor: 20 === result.length ? result[19].id : null }
						})
					}
				}
				;(UserService = tslib_1.__decorate(
					[
						(0, common_1.Injectable)(),
						tslib_1.__metadata("design:paramtypes", [
							"function" ==
							typeof (_a = void 0 !== prisma_service_1.PrismaService && prisma_service_1.PrismaService)
								? _a
								: Object,
						]),
					],
					UserService
				)),
					(exports.UserService = UserService)
			},
			5870: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.cloudinary = void 0)
				const cloudinary_1 = __webpack_require__(3518)
				cloudinary_1.v2.config({
					api_key: process.env.CLOUDINARY_api_key,
					api_secret: process.env.CLOUDINARY_api_secret,
					cloud_name: process.env.CLOUDINARY_cloud_name,
				}),
					(exports.cloudinary = cloudinary_1.v2.uploader)
			},
			9635: (__unused_webpack_module, exports, __webpack_require__) => {
				"use strict"
				Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.multerStorage = void 0)
				const tslib_1 = __webpack_require__(752),
					uuid_1 = __webpack_require__(5828),
					multer = __webpack_require__(1738)
				exports.multerStorage = multer.diskStorage({
					filename: (req, file, cb) =>
						tslib_1.__awaiter(void 0, void 0, void 0, function* () {
							const name =
								req.body.subRedditId + "." + (0, uuid_1.v4)() + "." + file.mimetype.split("/")[1]
							cb(null, name)
						}),
				})
			},
			6481: (module) => {
				"use strict"
				module.exports = require("@nestjs/common")
			},
			143: (module) => {
				"use strict"
				module.exports = require("@nestjs/core")
			},
			2064: (module) => {
				"use strict"
				module.exports = require("@nestjs/jwt")
			},
			4340: (module) => {
				"use strict"
				module.exports = require("@nestjs/passport")
			},
			6188: (module) => {
				"use strict"
				module.exports = require("@nestjs/platform-express")
			},
			3524: (module) => {
				"use strict"
				module.exports = require("@prisma/client")
			},
			9390: (module) => {
				"use strict"
				module.exports = require("accepts")
			},
			276: (module) => {
				"use strict"
				module.exports = require("array-flatten")
			},
			8432: (module) => {
				"use strict"
				module.exports = require("bcryptjs")
			},
			3986: (module) => {
				"use strict"
				module.exports = require("body-parser")
			},
			4004: (module) => {
				"use strict"
				module.exports = require("class-transformer")
			},
			5849: (module) => {
				"use strict"
				module.exports = require("class-validator")
			},
			3518: (module) => {
				"use strict"
				module.exports = require("cloudinary")
			},
			3298: (module) => {
				"use strict"
				module.exports = require("content-disposition")
			},
			9686: (module) => {
				"use strict"
				module.exports = require("content-type")
			},
			4802: (module) => {
				"use strict"
				module.exports = require("cookie")
			},
			9710: (module) => {
				"use strict"
				module.exports = require("cookie-parser")
			},
			2553: (module) => {
				"use strict"
				module.exports = require("cookie-signature")
			},
			6974: (module) => {
				"use strict"
				module.exports = require("debug")
			},
			2352: (module) => {
				"use strict"
				module.exports = require("depd")
			},
			5523: (module) => {
				"use strict"
				module.exports = require("encodeurl")
			},
			2079: (module) => {
				"use strict"
				module.exports = require("escape-html")
			},
			8046: (module) => {
				"use strict"
				module.exports = require("etag")
			},
			1239: (module) => {
				"use strict"
				module.exports = require("events")
			},
			6860: (module) => {
				"use strict"
				module.exports = require("express")
			},
			6508: (module) => {
				"use strict"
				module.exports = require("express-session")
			},
			5953: (module) => {
				"use strict"
				module.exports = require("finalhandler")
			},
			633: (module) => {
				"use strict"
				module.exports = require("fresh")
			},
			8931: (module) => {
				"use strict"
				module.exports = require("http-errors")
			},
			4665: (module) => {
				"use strict"
				module.exports = require("merge-descriptors")
			},
			4710: (module) => {
				"use strict"
				module.exports = require("methods")
			},
			1738: (module) => {
				"use strict"
				module.exports = require("multer")
			},
			2718: (module) => {
				"use strict"
				module.exports = require("on-finished")
			},
			9215: (module) => {
				"use strict"
				module.exports = require("parseurl")
			},
			4743: (module) => {
				"use strict"
				module.exports = require("passport-google-oauth20")
			},
			136: (module) => {
				"use strict"
				module.exports = require("passport-jwt")
			},
			8034: (module) => {
				"use strict"
				module.exports = require("passport-twitter")
			},
			99: (module) => {
				"use strict"
				module.exports = require("path-to-regexp")
			},
			929: (module) => {
				"use strict"
				module.exports = require("proxy-addr")
			},
			7104: (module) => {
				"use strict"
				module.exports = require("qs")
			},
			509: (module) => {
				"use strict"
				module.exports = require("range-parser")
			},
			5400: (module) => {
				"use strict"
				module.exports = require("safe-buffer")
			},
			4119: (module) => {
				"use strict"
				module.exports = require("send")
			},
			3161: (module) => {
				"use strict"
				module.exports = require("serve-static")
			},
			5008: (module) => {
				"use strict"
				module.exports = require("setprototypeof")
			},
			1154: (module) => {
				"use strict"
				module.exports = require("statuses")
			},
			752: (module) => {
				"use strict"
				module.exports = require("tslib")
			},
			8003: (module) => {
				"use strict"
				module.exports = require("type-is")
			},
			6588: (module) => {
				"use strict"
				module.exports = require("utils-merge")
			},
			5828: (module) => {
				"use strict"
				module.exports = require("uuid")
			},
			5561: (module) => {
				"use strict"
				module.exports = require("vary")
			},
			7147: (module) => {
				"use strict"
				module.exports = require("fs")
			},
			3685: (module) => {
				"use strict"
				module.exports = require("http")
			},
			1808: (module) => {
				"use strict"
				module.exports = require("net")
			},
			1017: (module) => {
				"use strict"
				module.exports = require("path")
			},
			3477: (module) => {
				"use strict"
				module.exports = require("querystring")
			},
		},
		__webpack_module_cache__ = {}
	function __webpack_require__(moduleId) {
		var cachedModule = __webpack_module_cache__[moduleId]
		if (void 0 !== cachedModule) return cachedModule.exports
		var module = (__webpack_module_cache__[moduleId] = { exports: {} })
		return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), module.exports
	}
	__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
	var __webpack_exports__ = {}
	;(() => {
		"use strict"
		var exports = __webpack_exports__
		Object.defineProperty(exports, "__esModule", { value: !0 })
		const tslib_1 = __webpack_require__(752),
			common_1 = __webpack_require__(6481),
			core_1 = __webpack_require__(143),
			cookieParser = __webpack_require__(9710),
			session = __webpack_require__(6508),
			app_module_1 = __webpack_require__(3199),
			port = process.env.PORT || 3333
		!(function () {
			tslib_1.__awaiter(this, void 0, void 0, function* () {
				const app = yield core_1.NestFactory.create(app_module_1.AppModule)
				app.enableCors({
					credentials: !0,
					origin: ["http://localhost:3000", "https://full-stack-reddit-clone-omcbkm24i-tictac22.vercel.app"],
				}),
					app.use(session({ secret: "my-secret", resave: !1, saveUninitialized: !1 })),
					app.use(cookieParser()),
					app.useGlobalPipes(
						new common_1.ValidationPipe({
							whitelist: !0,
							transform: !0,
							exceptionFactory: (errors) => {
								const errorsMessages = {}
								return (
									errors.forEach((error) => {
										errorsMessages[error.property] =
											error.constraints[Object.keys(error.constraints)[0]]
									}),
									new common_1.BadRequestException(errorsMessages)
								)
							},
						})
					),
					yield app.listen(port, "0.0.0.0"),
					common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`)
			})
		})()
	})()
	var __webpack_export_target__ = exports
	for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i]
	__webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", { value: !0 })
})()