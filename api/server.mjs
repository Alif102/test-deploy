var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "17.2.4",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/lib/main.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var crypto = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var TIPS = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F4E1} add observability to secrets: https://dotenvx.com/ops",
      "\u{1F465} sync secrets across teammates & machines: https://dotenvx.com/ops",
      "\u{1F5C2}\uFE0F backup and recover secrets: https://dotenvx.com/ops",
      "\u2705 audit secrets and track compliance: https://dotenvx.com/ops",
      "\u{1F504} add secrets lifecycle management: https://dotenvx.com/ops",
      "\u{1F511} add access controls to secrets: https://dotenvx.com/ops",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/lib/env-options.js"(exports, module) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/lib/cli-options.js"(exports, module) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    };
  }
});

// node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/config.js
var init_config = __esm({
  "node_modules/.pnpm/dotenv@17.2.4/node_modules/dotenv/config.js"() {
    "use strict";
    (function() {
      require_main().config(
        Object.assign(
          {},
          require_env_options(),
          require_cli_options()(process.argv)
        )
      );
    })();
  }
});

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.3.0",
      "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
      "activeProvider": "postgresql",
      "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id         Int        @id @default(autoincrement())\n  name       String\n  email      String     @unique\n  password   String?\n  role       Role       @default(USER)\n  phone      String\n  picture    String?\n  status     UserStatus @default(ACTIVE)\n  isVerified Boolean    @default(false)\n  createdAt  DateTime   @default(now())\n  updatedAt  DateTime   @updatedAt\n  categories Category[]\n  posts      Post[]\n}\n\nmodel Category {\n  id        Int      @id @default(autoincrement())\n  name      String   @unique\n  picture   String?\n  authorId  Int\n  author    User     @relation(fields: [authorId], references: [id])\n  posts     Post[]\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Post {\n  id         Int      @id @default(autoincrement())\n  title      String\n  content    String\n  plantType  String?\n  thumbnail  String?\n  isFeatured Boolean  @default(false)\n  tags       String[]\n  views      Int      @default(0)\n\n  authorId Int\n  author   User @relation(fields: [authorId], references: [id])\n\n  categoryId Int?\n  category   Category? @relation(fields: [categoryId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  MODERATOR\n  USER\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  BLOCK\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"phone","kind":"scalar","type":"String"},{"name":"picture","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"isVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToUser"},{"name":"posts","kind":"object","type":"Post","relationName":"PostToUser"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"picture","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"Int"},{"name":"author","kind":"object","type":"User","relationName":"CategoryToUser"},{"name":"posts","kind":"object","type":"Post","relationName":"CategoryToPost"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Post":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"plantType","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"tags","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"authorId","kind":"scalar","type":"Int"},{"name":"author","kind":"object","type":"User","relationName":"PostToUser"},{"name":"categoryId","kind":"scalar","type":"Int"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToPost"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext, NullTypes2, TransactionIsolationLevel, defineExtension;
var init_prismaNamespace = __esm({
  "generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// generated/prisma/enums.ts
var init_enums = __esm({
  "generated/prisma/enums.ts"() {
    "use strict";
  }
});

// generated/prisma/client.ts
var PrismaClient;
var init_client = __esm({
  "generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    PrismaClient = getPrismaClientClass();
  }
});

// config/db.ts
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_db = __esm({
  "config/db.ts"() {
    "use strict";
    init_config();
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/modules/user/user.service.ts
var createUser, getAllFromDB, getUserById, updateUser, deleteUser, UserService;
var init_user_service = __esm({
  "src/modules/user/user.service.ts"() {
    "use strict";
    init_db();
    createUser = async (payload) => {
      return prisma.user.create({
        data: payload
      });
    };
    getAllFromDB = async () => {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          picture: true,
          createdAt: true,
          updatedAt: true,
          role: true,
          status: true,
          posts: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      return result;
    };
    getUserById = async (id) => {
      const result = await prisma.user.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          picture: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          posts: true
        }
      });
      return result;
    };
    updateUser = async (id, payload) => {
      const result = await prisma.user.update({
        where: {
          id
        },
        data: payload
      });
      return result;
    };
    deleteUser = async (id) => {
      const result = await prisma.user.delete({
        where: {
          id
        }
      });
      return result;
    };
    UserService = {
      createUser,
      getAllFromDB,
      getUserById,
      updateUser,
      deleteUser
    };
  }
});

// src/modules/user/user.controller.ts
var createUser2, getAllFromDB2, getUserById2, updateUser2, deleteUser2, UserController;
var init_user_controller = __esm({
  "src/modules/user/user.controller.ts"() {
    "use strict";
    init_user_service();
    createUser2 = async (req, res) => {
      try {
        const result = await UserService.createUser(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    getAllFromDB2 = async (req, res) => {
      try {
        const result = await UserService.getAllFromDB();
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    getUserById2 = async (req, res) => {
      try {
        const result = await UserService.getUserById(Number(req.params.id));
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    updateUser2 = async (req, res) => {
      try {
        const result = await UserService.updateUser(Number(req.params.id), req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    deleteUser2 = async (req, res) => {
      try {
        const result = await UserService.deleteUser(Number(req.params.id));
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    UserController = {
      createUser: createUser2,
      getAllFromDB: getAllFromDB2,
      getUserById: getUserById2,
      updateUser: updateUser2,
      deleteUser: deleteUser2
    };
  }
});

// src/modules/user/user.routes.ts
import express from "express";
var router, userRouter;
var init_user_routes = __esm({
  "src/modules/user/user.routes.ts"() {
    "use strict";
    init_user_controller();
    router = express.Router();
    router.get(
      "/",
      UserController.getAllFromDB
    );
    router.get(
      "/:id",
      UserController.getUserById
    );
    router.post(
      "/",
      UserController.createUser
    );
    router.patch(
      "/:id",
      UserController.updateUser
    );
    router.delete(
      "/:id",
      UserController.deleteUser
    );
    userRouter = router;
  }
});

// src/modules/post/post.service.ts
var createPost, getAllPosts, getPostById, getPostsByCategory, updatePost, deletePost, getBlogStat, PostService;
var init_post_service = __esm({
  "src/modules/post/post.service.ts"() {
    "use strict";
    init_db();
    createPost = async (payload) => {
      const result = await prisma.post.create({
        data: payload,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: true
        }
      });
      return result;
    };
    getAllPosts = async ({
      page = 1,
      limit = 10,
      search,
      isFeatured,
      tags
    }) => {
      const skip = (page - 1) * limit;
      const where = {
        AND: [
          search && {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } }
            ]
          },
          typeof isFeatured === "boolean" && { isFeatured },
          tags && tags.length > 0 && { tags: { hasEvery: tags } }
        ].filter(Boolean)
      };
      const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
          author: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      const total = await prisma.post.count({ where });
      return {
        data: result,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    };
    getPostById = async (id) => {
      return await prisma.$transaction(async (tx) => {
        await tx.post.update({
          where: { id },
          data: {
            views: {
              increment: 1
            }
          }
        });
        return await tx.post.findUnique({
          where: { id },
          include: { author: true }
        });
      });
    };
    getPostsByCategory = async (categoryId) => {
      const posts = await prisma.post.findMany({
        where: {
          categoryId
          // filter by categoryId
        },
        include: {
          author: true
          // include author relation
        },
        orderBy: {
          createdAt: "desc"
          // latest post first
        }
      });
      return posts;
    };
    updatePost = async (id, data) => {
      return prisma.post.update({ where: { id }, data });
    };
    deletePost = async (id) => {
      return prisma.post.delete({ where: { id } });
    };
    getBlogStat = async () => {
      return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.post.aggregate({
          _count: true,
          _sum: { views: true },
          _avg: { views: true },
          _max: { views: true },
          _min: { views: true }
        });
        const featuredCount = await tx.post.count({
          where: {
            isFeatured: true
          }
        });
        const topFeatured = await tx.post.findFirst({
          where: { isFeatured: true },
          orderBy: { views: "desc" }
        });
        const lastWeek = /* @__PURE__ */ new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekPostCount = await tx.post.count({
          where: {
            createdAt: {
              gte: lastWeek
            }
          }
        });
        return {
          stats: {
            totalPosts: aggregates._count ?? 0,
            totalViews: aggregates._sum.views ?? 0,
            avgViews: aggregates._avg.views ?? 0,
            minViews: aggregates._min.views ?? 0,
            maxViews: aggregates._max.views ?? 0
          },
          featured: {
            count: featuredCount,
            topPost: topFeatured
          },
          lastWeekPostCount
        };
      });
    };
    PostService = {
      createPost,
      getAllPosts,
      getPostById,
      getPostsByCategory,
      updatePost,
      deletePost,
      getBlogStat
    };
  }
});

// src/modules/post/post.controller.ts
var createPost2, getAllPosts2, getPostById2, getPostsByCategory2, updatePost2, deletePost2, getBlogStat2, PostController;
var init_post_controller = __esm({
  "src/modules/post/post.controller.ts"() {
    "use strict";
    init_post_service();
    createPost2 = async (req, res) => {
      try {
        const result = await PostService.createPost(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    getAllPosts2 = async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : void 0;
        const tags = req.query.tags ? req.query.tags.split(",") : [];
        const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts", details: err });
      }
    };
    getPostById2 = async (req, res) => {
      const post = await PostService.getPostById(Number(req.params.id));
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    };
    getPostsByCategory2 = async (req, res) => {
      try {
        const categoryId = Number(req.params.id);
        const posts = await PostService.getPostsByCategory(categoryId);
        res.json({ data: posts });
      } catch (error) {
        console.error(error);
      }
    };
    updatePost2 = async (req, res) => {
      const post = await PostService.updatePost(Number(req.params.id), req.body);
      res.json(post);
    };
    deletePost2 = async (req, res) => {
      await PostService.deletePost(Number(req.params.id));
      res.json({ message: "Post deleted" });
    };
    getBlogStat2 = async (req, res) => {
      try {
        const result = await PostService.getBlogStat();
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats", details: err });
      }
    };
    PostController = {
      createPost: createPost2,
      getAllPosts: getAllPosts2,
      getPostById: getPostById2,
      getPostsByCategory: getPostsByCategory2,
      updatePost: updatePost2,
      deletePost: deletePost2,
      getBlogStat: getBlogStat2
    };
  }
});

// src/modules/post/post.router.ts
import express2 from "express";
var router2, postRouter;
var init_post_router = __esm({
  "src/modules/post/post.router.ts"() {
    "use strict";
    init_post_controller();
    router2 = express2.Router();
    router2.get("/stats", PostController.getBlogStat);
    router2.post(
      "/",
      PostController.createPost
    );
    router2.get("/", PostController.getAllPosts);
    router2.get("/:id", PostController.getPostById);
    router2.get("/category/:id", PostController.getPostsByCategory);
    router2.patch("/:id", PostController.updatePost);
    router2.delete("/:id", PostController.deletePost);
    postRouter = router2;
  }
});

// src/modules/auth/auth.service.ts
var loginWithEmailAndPassword, authWithGoogle, AuthService;
var init_auth_service = __esm({
  "src/modules/auth/auth.service.ts"() {
    "use strict";
    init_db();
    loginWithEmailAndPassword = async ({ email, password }) => {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (!user) {
        throw new Error("User not found!");
      }
      if (password === user.password) {
        return user;
      } else {
        throw new Error("Password is incorrect!");
      }
    };
    authWithGoogle = async (data) => {
      let user = await prisma.user.findUnique({
        where: {
          email: data.email
        }
      });
      if (!user) {
        user = await prisma.user.create({
          data
        });
      }
      return user;
    };
    AuthService = {
      loginWithEmailAndPassword,
      authWithGoogle
    };
  }
});

// src/modules/auth/auth.controller.ts
var loginWithEmailAndPassword2, authWithGoogle2, AuthController;
var init_auth_controller = __esm({
  "src/modules/auth/auth.controller.ts"() {
    "use strict";
    init_auth_service();
    loginWithEmailAndPassword2 = async (req, res) => {
      try {
        const result = await AuthService.loginWithEmailAndPassword(req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    authWithGoogle2 = async (req, res) => {
      try {
        const result = await AuthService.authWithGoogle(req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    AuthController = {
      loginWithEmailAndPassword: loginWithEmailAndPassword2,
      authWithGoogle: authWithGoogle2
    };
  }
});

// src/modules/auth/auth.router.ts
import express3 from "express";
var router3, authRouter;
var init_auth_router = __esm({
  "src/modules/auth/auth.router.ts"() {
    "use strict";
    init_auth_controller();
    router3 = express3.Router();
    router3.post(
      "/login",
      AuthController.loginWithEmailAndPassword
    );
    router3.post(
      "/google",
      AuthController.authWithGoogle
    );
    authRouter = router3;
  }
});

// src/modules/category/category.service.ts
var createCategory, getAllCategories, CategoryService;
var init_category_service = __esm({
  "src/modules/category/category.service.ts"() {
    "use strict";
    init_db();
    createCategory = async (payload) => {
      const result = await prisma.category.create({
        data: payload,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      return result;
    };
    getAllCategories = async () => {
      return prisma.category.findMany({
        include: {
          author: true
        }
      });
    };
    CategoryService = {
      createCategory,
      getAllCategories
    };
  }
});

// src/modules/category/category.controller.ts
var createCategory2, getAllCategories2, CategoryController;
var init_category_controller = __esm({
  "src/modules/category/category.controller.ts"() {
    "use strict";
    init_category_service();
    createCategory2 = async (req, res) => {
      try {
        const result = await CategoryService.createCategory(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    };
    getAllCategories2 = async (req, res) => {
      const result = await CategoryService.getAllCategories();
      res.json(result);
    };
    CategoryController = {
      createCategory: createCategory2,
      getAllCategories: getAllCategories2
    };
  }
});

// src/modules/category/category.router.ts
import express4 from "express";
var router4, CategoryRouter;
var init_category_router = __esm({
  "src/modules/category/category.router.ts"() {
    "use strict";
    init_category_controller();
    router4 = express4.Router();
    router4.get("/", CategoryController.getAllCategories);
    router4.post(
      "/",
      CategoryController.createCategory
    );
    CategoryRouter = router4;
  }
});

// src/app.ts
import compression from "compression";
import cors from "cors";
import express5 from "express";
var app, app_default;
var init_app = __esm({
  "src/app.ts"() {
    "use strict";
    init_user_routes();
    init_post_router();
    init_auth_router();
    init_category_router();
    app = express5();
    app.use(cors());
    app.use(compression());
    app.use(express5.json());
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true
      })
    );
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/categories", CategoryRouter);
    app.use("/api/v1/post", postRouter);
    app.use("/api/v1/auth", authRouter);
    app.get("/", (_req, res) => {
      res.send("API is running");
    });
    app.use((req, res, next) => {
      res.status(404).json({
        success: false,
        message: "Route Not Found"
      });
    });
    app_default = app;
  }
});

// src/server.ts
import http from "http";
var require_server = __commonJS({
  "src/server.ts"() {
    init_app();
    var import_dotenv = __toESM(require_main());
    init_db();
    import_dotenv.default.config();
    var server = null;
    async function connectToDB() {
      try {
        await prisma.$connect();
        console.log("*** DB connection successfull!!");
      } catch (error) {
        console.log("*** DB connection failed!");
        process.exit(1);
      }
    }
    async function startServer() {
      try {
        await connectToDB();
        server = http.createServer(app_default);
        server.listen(process.env.PORT, () => {
          console.log(`\u{1F680} Server is running on port ${process.env.PORT}`);
        });
        handleProcessEvents();
      } catch (error) {
        console.error("\u274C Error during server startup:", error);
        process.exit(1);
      }
    }
    async function gracefulShutdown(signal) {
      console.warn(`\u{1F504} Received ${signal}, shutting down gracefully...`);
      if (server) {
        server.close(async () => {
          console.log("\u2705 HTTP server closed.");
          try {
            await prisma.$disconnect();
            console.log("\u2705 Prisma disconnected.");
            console.log("Server shutdown complete.");
          } catch (error) {
            console.error("\u274C Error during shutdown:", error);
          }
          process.exit(0);
        });
      } else {
        await prisma.$disconnect();
        process.exit(0);
      }
    }
    function handleProcessEvents() {
      process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
      process.on("SIGINT", () => gracefulShutdown("SIGINT"));
      process.on("uncaughtException", (error) => {
        console.error("\u{1F4A5} Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
      });
      process.on("unhandledRejection", (reason) => {
        console.error("\u{1F4A5} Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
      });
    }
    startServer();
  }
});
export default require_server();
