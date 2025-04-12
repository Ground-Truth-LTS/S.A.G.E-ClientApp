
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Processed_Sensor_Data
 * 
 */
export type Processed_Sensor_Data = $Result.DefaultSelection<Prisma.$Processed_Sensor_DataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Devices
 * const devices = await prisma.device.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Devices
   * const devices = await prisma.device.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processed_Sensor_Data`: Exposes CRUD operations for the **Processed_Sensor_Data** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Processed_Sensor_Data
    * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findMany()
    * ```
    */
  get processed_Sensor_Data(): Prisma.Processed_Sensor_DataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Device: 'Device',
    Session: 'Session',
    Processed_Sensor_Data: 'Processed_Sensor_Data'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "device" | "session" | "processed_Sensor_Data"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Processed_Sensor_Data: {
        payload: Prisma.$Processed_Sensor_DataPayload<ExtArgs>
        fields: Prisma.Processed_Sensor_DataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Processed_Sensor_DataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Processed_Sensor_DataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>
          }
          findFirst: {
            args: Prisma.Processed_Sensor_DataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Processed_Sensor_DataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>
          }
          findMany: {
            args: Prisma.Processed_Sensor_DataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>[]
          }
          create: {
            args: Prisma.Processed_Sensor_DataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>
          }
          createMany: {
            args: Prisma.Processed_Sensor_DataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Processed_Sensor_DataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>[]
          }
          delete: {
            args: Prisma.Processed_Sensor_DataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>
          }
          update: {
            args: Prisma.Processed_Sensor_DataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>
          }
          deleteMany: {
            args: Prisma.Processed_Sensor_DataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Processed_Sensor_DataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Processed_Sensor_DataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>[]
          }
          upsert: {
            args: Prisma.Processed_Sensor_DataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Processed_Sensor_DataPayload>
          }
          aggregate: {
            args: Prisma.Processed_Sensor_DataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessed_Sensor_Data>
          }
          groupBy: {
            args: Prisma.Processed_Sensor_DataGroupByArgs<ExtArgs>
            result: $Utils.Optional<Processed_Sensor_DataGroupByOutputType>[]
          }
          count: {
            args: Prisma.Processed_Sensor_DataCountArgs<ExtArgs>
            result: $Utils.Optional<Processed_Sensor_DataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    device?: DeviceOmit
    session?: SessionOmit
    processed_Sensor_Data?: Processed_Sensor_DataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    sessions: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | DeviceCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    processedData: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedData?: boolean | SessionCountOutputTypeCountProcessedDataArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountProcessedDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Processed_Sensor_DataWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceAvgAggregateOutputType = {
    device_id: number | null
  }

  export type DeviceSumAggregateOutputType = {
    device_id: number | null
  }

  export type DeviceMinAggregateOutputType = {
    device_id: number | null
    device_name: string | null
  }

  export type DeviceMaxAggregateOutputType = {
    device_id: number | null
    device_name: string | null
  }

  export type DeviceCountAggregateOutputType = {
    device_id: number
    device_name: number
    _all: number
  }


  export type DeviceAvgAggregateInputType = {
    device_id?: true
  }

  export type DeviceSumAggregateInputType = {
    device_id?: true
  }

  export type DeviceMinAggregateInputType = {
    device_id?: true
    device_name?: true
  }

  export type DeviceMaxAggregateInputType = {
    device_id?: true
    device_name?: true
  }

  export type DeviceCountAggregateInputType = {
    device_id?: true
    device_name?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _avg?: DeviceAvgAggregateInputType
    _sum?: DeviceSumAggregateInputType
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    device_id: number
    device_name: string | null
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    device_id?: boolean
    device_name?: boolean
    sessions?: boolean | Device$sessionsArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    device_id?: boolean
    device_name?: boolean
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    device_id?: boolean
    device_name?: boolean
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    device_id?: boolean
    device_name?: boolean
  }

  export type DeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"device_id" | "device_name", ExtArgs["result"]["device"]>
  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Device$sessionsArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      device_id: number
      device_name: string | null
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `device_id`
     * const deviceWithDevice_idOnly = await prisma.device.findMany({ select: { device_id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `device_id`
     * const deviceWithDevice_idOnly = await prisma.device.createManyAndReturn({
     *   select: { device_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {DeviceUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `device_id`
     * const deviceWithDevice_idOnly = await prisma.device.updateManyAndReturn({
     *   select: { device_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Device$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Device$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Device model
   */
  interface DeviceFieldRefs {
    readonly device_id: FieldRef<"Device", 'Int'>
    readonly device_name: FieldRef<"Device", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data?: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device updateManyAndReturn
   */
  export type DeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to delete.
     */
    limit?: number
  }

  /**
   * Device.sessions
   */
  export type Device$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    session_id: number | null
    device_id: number | null
  }

  export type SessionSumAggregateOutputType = {
    session_id: number | null
    device_id: number | null
  }

  export type SessionMinAggregateOutputType = {
    session_id: number | null
    timestamp_start: Date | null
    timestamp_end: Date | null
    location: string | null
    device_id: number | null
  }

  export type SessionMaxAggregateOutputType = {
    session_id: number | null
    timestamp_start: Date | null
    timestamp_end: Date | null
    location: string | null
    device_id: number | null
  }

  export type SessionCountAggregateOutputType = {
    session_id: number
    timestamp_start: number
    timestamp_end: number
    location: number
    device_id: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    session_id?: true
    device_id?: true
  }

  export type SessionSumAggregateInputType = {
    session_id?: true
    device_id?: true
  }

  export type SessionMinAggregateInputType = {
    session_id?: true
    timestamp_start?: true
    timestamp_end?: true
    location?: true
    device_id?: true
  }

  export type SessionMaxAggregateInputType = {
    session_id?: true
    timestamp_start?: true
    timestamp_end?: true
    location?: true
    device_id?: true
  }

  export type SessionCountAggregateInputType = {
    session_id?: true
    timestamp_start?: true
    timestamp_end?: true
    location?: true
    device_id?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    session_id: number
    timestamp_start: Date | null
    timestamp_end: Date | null
    location: string | null
    device_id: number
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    timestamp_start?: boolean
    timestamp_end?: boolean
    location?: boolean
    device_id?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
    processedData?: boolean | Session$processedDataArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    timestamp_start?: boolean
    timestamp_end?: boolean
    location?: boolean
    device_id?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    timestamp_start?: boolean
    timestamp_end?: boolean
    location?: boolean
    device_id?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    session_id?: boolean
    timestamp_start?: boolean
    timestamp_end?: boolean
    location?: boolean
    device_id?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"session_id" | "timestamp_start" | "timestamp_end" | "location" | "device_id", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
    processedData?: boolean | Session$processedDataArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      device: Prisma.$DevicePayload<ExtArgs>
      processedData: Prisma.$Processed_Sensor_DataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      session_id: number
      timestamp_start: Date | null
      timestamp_end: Date | null
      location: string | null
      device_id: number
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `session_id`
     * const sessionWithSession_idOnly = await prisma.session.findMany({ select: { session_id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `session_id`
     * const sessionWithSession_idOnly = await prisma.session.createManyAndReturn({
     *   select: { session_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `session_id`
     * const sessionWithSession_idOnly = await prisma.session.updateManyAndReturn({
     *   select: { session_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    device<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    processedData<T extends Session$processedDataArgs<ExtArgs> = {}>(args?: Subset<T, Session$processedDataArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly session_id: FieldRef<"Session", 'Int'>
    readonly timestamp_start: FieldRef<"Session", 'DateTime'>
    readonly timestamp_end: FieldRef<"Session", 'DateTime'>
    readonly location: FieldRef<"Session", 'String'>
    readonly device_id: FieldRef<"Session", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.processedData
   */
  export type Session$processedDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    where?: Processed_Sensor_DataWhereInput
    orderBy?: Processed_Sensor_DataOrderByWithRelationInput | Processed_Sensor_DataOrderByWithRelationInput[]
    cursor?: Processed_Sensor_DataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Processed_Sensor_DataScalarFieldEnum | Processed_Sensor_DataScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Processed_Sensor_Data
   */

  export type AggregateProcessed_Sensor_Data = {
    _count: Processed_Sensor_DataCountAggregateOutputType | null
    _avg: Processed_Sensor_DataAvgAggregateOutputType | null
    _sum: Processed_Sensor_DataSumAggregateOutputType | null
    _min: Processed_Sensor_DataMinAggregateOutputType | null
    _max: Processed_Sensor_DataMaxAggregateOutputType | null
  }

  export type Processed_Sensor_DataAvgAggregateOutputType = {
    data_id: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    pH: number | null
    moisture: number | null
    temperature: number | null
    session_id: number | null
  }

  export type Processed_Sensor_DataSumAggregateOutputType = {
    data_id: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    pH: number | null
    moisture: number | null
    temperature: number | null
    session_id: number | null
  }

  export type Processed_Sensor_DataMinAggregateOutputType = {
    data_id: number | null
    timestamp: Date | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    pH: number | null
    moisture: number | null
    temperature: number | null
    session_id: number | null
  }

  export type Processed_Sensor_DataMaxAggregateOutputType = {
    data_id: number | null
    timestamp: Date | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    pH: number | null
    moisture: number | null
    temperature: number | null
    session_id: number | null
  }

  export type Processed_Sensor_DataCountAggregateOutputType = {
    data_id: number
    timestamp: number
    nitrogen: number
    phosphorus: number
    potassium: number
    pH: number
    moisture: number
    temperature: number
    session_id: number
    _all: number
  }


  export type Processed_Sensor_DataAvgAggregateInputType = {
    data_id?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    pH?: true
    moisture?: true
    temperature?: true
    session_id?: true
  }

  export type Processed_Sensor_DataSumAggregateInputType = {
    data_id?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    pH?: true
    moisture?: true
    temperature?: true
    session_id?: true
  }

  export type Processed_Sensor_DataMinAggregateInputType = {
    data_id?: true
    timestamp?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    pH?: true
    moisture?: true
    temperature?: true
    session_id?: true
  }

  export type Processed_Sensor_DataMaxAggregateInputType = {
    data_id?: true
    timestamp?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    pH?: true
    moisture?: true
    temperature?: true
    session_id?: true
  }

  export type Processed_Sensor_DataCountAggregateInputType = {
    data_id?: true
    timestamp?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    pH?: true
    moisture?: true
    temperature?: true
    session_id?: true
    _all?: true
  }

  export type Processed_Sensor_DataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Processed_Sensor_Data to aggregate.
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processed_Sensor_Data to fetch.
     */
    orderBy?: Processed_Sensor_DataOrderByWithRelationInput | Processed_Sensor_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Processed_Sensor_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processed_Sensor_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processed_Sensor_Data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Processed_Sensor_Data
    **/
    _count?: true | Processed_Sensor_DataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Processed_Sensor_DataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Processed_Sensor_DataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Processed_Sensor_DataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Processed_Sensor_DataMaxAggregateInputType
  }

  export type GetProcessed_Sensor_DataAggregateType<T extends Processed_Sensor_DataAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessed_Sensor_Data]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessed_Sensor_Data[P]>
      : GetScalarType<T[P], AggregateProcessed_Sensor_Data[P]>
  }




  export type Processed_Sensor_DataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Processed_Sensor_DataWhereInput
    orderBy?: Processed_Sensor_DataOrderByWithAggregationInput | Processed_Sensor_DataOrderByWithAggregationInput[]
    by: Processed_Sensor_DataScalarFieldEnum[] | Processed_Sensor_DataScalarFieldEnum
    having?: Processed_Sensor_DataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Processed_Sensor_DataCountAggregateInputType | true
    _avg?: Processed_Sensor_DataAvgAggregateInputType
    _sum?: Processed_Sensor_DataSumAggregateInputType
    _min?: Processed_Sensor_DataMinAggregateInputType
    _max?: Processed_Sensor_DataMaxAggregateInputType
  }

  export type Processed_Sensor_DataGroupByOutputType = {
    data_id: number
    timestamp: Date | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    pH: number | null
    moisture: number | null
    temperature: number | null
    session_id: number
    _count: Processed_Sensor_DataCountAggregateOutputType | null
    _avg: Processed_Sensor_DataAvgAggregateOutputType | null
    _sum: Processed_Sensor_DataSumAggregateOutputType | null
    _min: Processed_Sensor_DataMinAggregateOutputType | null
    _max: Processed_Sensor_DataMaxAggregateOutputType | null
  }

  type GetProcessed_Sensor_DataGroupByPayload<T extends Processed_Sensor_DataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Processed_Sensor_DataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Processed_Sensor_DataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Processed_Sensor_DataGroupByOutputType[P]>
            : GetScalarType<T[P], Processed_Sensor_DataGroupByOutputType[P]>
        }
      >
    >


  export type Processed_Sensor_DataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    data_id?: boolean
    timestamp?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    pH?: boolean
    moisture?: boolean
    temperature?: boolean
    session_id?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processed_Sensor_Data"]>

  export type Processed_Sensor_DataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    data_id?: boolean
    timestamp?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    pH?: boolean
    moisture?: boolean
    temperature?: boolean
    session_id?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processed_Sensor_Data"]>

  export type Processed_Sensor_DataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    data_id?: boolean
    timestamp?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    pH?: boolean
    moisture?: boolean
    temperature?: boolean
    session_id?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processed_Sensor_Data"]>

  export type Processed_Sensor_DataSelectScalar = {
    data_id?: boolean
    timestamp?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    pH?: boolean
    moisture?: boolean
    temperature?: boolean
    session_id?: boolean
  }

  export type Processed_Sensor_DataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"data_id" | "timestamp" | "nitrogen" | "phosphorus" | "potassium" | "pH" | "moisture" | "temperature" | "session_id", ExtArgs["result"]["processed_Sensor_Data"]>
  export type Processed_Sensor_DataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type Processed_Sensor_DataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type Processed_Sensor_DataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $Processed_Sensor_DataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Processed_Sensor_Data"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      data_id: number
      timestamp: Date | null
      nitrogen: number | null
      phosphorus: number | null
      potassium: number | null
      pH: number | null
      moisture: number | null
      temperature: number | null
      session_id: number
    }, ExtArgs["result"]["processed_Sensor_Data"]>
    composites: {}
  }

  type Processed_Sensor_DataGetPayload<S extends boolean | null | undefined | Processed_Sensor_DataDefaultArgs> = $Result.GetResult<Prisma.$Processed_Sensor_DataPayload, S>

  type Processed_Sensor_DataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Processed_Sensor_DataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Processed_Sensor_DataCountAggregateInputType | true
    }

  export interface Processed_Sensor_DataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Processed_Sensor_Data'], meta: { name: 'Processed_Sensor_Data' } }
    /**
     * Find zero or one Processed_Sensor_Data that matches the filter.
     * @param {Processed_Sensor_DataFindUniqueArgs} args - Arguments to find a Processed_Sensor_Data
     * @example
     * // Get one Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Processed_Sensor_DataFindUniqueArgs>(args: SelectSubset<T, Processed_Sensor_DataFindUniqueArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Processed_Sensor_Data that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Processed_Sensor_DataFindUniqueOrThrowArgs} args - Arguments to find a Processed_Sensor_Data
     * @example
     * // Get one Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Processed_Sensor_DataFindUniqueOrThrowArgs>(args: SelectSubset<T, Processed_Sensor_DataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Processed_Sensor_Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataFindFirstArgs} args - Arguments to find a Processed_Sensor_Data
     * @example
     * // Get one Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Processed_Sensor_DataFindFirstArgs>(args?: SelectSubset<T, Processed_Sensor_DataFindFirstArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Processed_Sensor_Data that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataFindFirstOrThrowArgs} args - Arguments to find a Processed_Sensor_Data
     * @example
     * // Get one Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Processed_Sensor_DataFindFirstOrThrowArgs>(args?: SelectSubset<T, Processed_Sensor_DataFindFirstOrThrowArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Processed_Sensor_Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findMany()
     * 
     * // Get first 10 Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.findMany({ take: 10 })
     * 
     * // Only select the `data_id`
     * const processed_Sensor_DataWithData_idOnly = await prisma.processed_Sensor_Data.findMany({ select: { data_id: true } })
     * 
     */
    findMany<T extends Processed_Sensor_DataFindManyArgs>(args?: SelectSubset<T, Processed_Sensor_DataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Processed_Sensor_Data.
     * @param {Processed_Sensor_DataCreateArgs} args - Arguments to create a Processed_Sensor_Data.
     * @example
     * // Create one Processed_Sensor_Data
     * const Processed_Sensor_Data = await prisma.processed_Sensor_Data.create({
     *   data: {
     *     // ... data to create a Processed_Sensor_Data
     *   }
     * })
     * 
     */
    create<T extends Processed_Sensor_DataCreateArgs>(args: SelectSubset<T, Processed_Sensor_DataCreateArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Processed_Sensor_Data.
     * @param {Processed_Sensor_DataCreateManyArgs} args - Arguments to create many Processed_Sensor_Data.
     * @example
     * // Create many Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Processed_Sensor_DataCreateManyArgs>(args?: SelectSubset<T, Processed_Sensor_DataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Processed_Sensor_Data and returns the data saved in the database.
     * @param {Processed_Sensor_DataCreateManyAndReturnArgs} args - Arguments to create many Processed_Sensor_Data.
     * @example
     * // Create many Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Processed_Sensor_Data and only return the `data_id`
     * const processed_Sensor_DataWithData_idOnly = await prisma.processed_Sensor_Data.createManyAndReturn({
     *   select: { data_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Processed_Sensor_DataCreateManyAndReturnArgs>(args?: SelectSubset<T, Processed_Sensor_DataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Processed_Sensor_Data.
     * @param {Processed_Sensor_DataDeleteArgs} args - Arguments to delete one Processed_Sensor_Data.
     * @example
     * // Delete one Processed_Sensor_Data
     * const Processed_Sensor_Data = await prisma.processed_Sensor_Data.delete({
     *   where: {
     *     // ... filter to delete one Processed_Sensor_Data
     *   }
     * })
     * 
     */
    delete<T extends Processed_Sensor_DataDeleteArgs>(args: SelectSubset<T, Processed_Sensor_DataDeleteArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Processed_Sensor_Data.
     * @param {Processed_Sensor_DataUpdateArgs} args - Arguments to update one Processed_Sensor_Data.
     * @example
     * // Update one Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Processed_Sensor_DataUpdateArgs>(args: SelectSubset<T, Processed_Sensor_DataUpdateArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Processed_Sensor_Data.
     * @param {Processed_Sensor_DataDeleteManyArgs} args - Arguments to filter Processed_Sensor_Data to delete.
     * @example
     * // Delete a few Processed_Sensor_Data
     * const { count } = await prisma.processed_Sensor_Data.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Processed_Sensor_DataDeleteManyArgs>(args?: SelectSubset<T, Processed_Sensor_DataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Processed_Sensor_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Processed_Sensor_DataUpdateManyArgs>(args: SelectSubset<T, Processed_Sensor_DataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Processed_Sensor_Data and returns the data updated in the database.
     * @param {Processed_Sensor_DataUpdateManyAndReturnArgs} args - Arguments to update many Processed_Sensor_Data.
     * @example
     * // Update many Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Processed_Sensor_Data and only return the `data_id`
     * const processed_Sensor_DataWithData_idOnly = await prisma.processed_Sensor_Data.updateManyAndReturn({
     *   select: { data_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Processed_Sensor_DataUpdateManyAndReturnArgs>(args: SelectSubset<T, Processed_Sensor_DataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Processed_Sensor_Data.
     * @param {Processed_Sensor_DataUpsertArgs} args - Arguments to update or create a Processed_Sensor_Data.
     * @example
     * // Update or create a Processed_Sensor_Data
     * const processed_Sensor_Data = await prisma.processed_Sensor_Data.upsert({
     *   create: {
     *     // ... data to create a Processed_Sensor_Data
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Processed_Sensor_Data we want to update
     *   }
     * })
     */
    upsert<T extends Processed_Sensor_DataUpsertArgs>(args: SelectSubset<T, Processed_Sensor_DataUpsertArgs<ExtArgs>>): Prisma__Processed_Sensor_DataClient<$Result.GetResult<Prisma.$Processed_Sensor_DataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Processed_Sensor_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataCountArgs} args - Arguments to filter Processed_Sensor_Data to count.
     * @example
     * // Count the number of Processed_Sensor_Data
     * const count = await prisma.processed_Sensor_Data.count({
     *   where: {
     *     // ... the filter for the Processed_Sensor_Data we want to count
     *   }
     * })
    **/
    count<T extends Processed_Sensor_DataCountArgs>(
      args?: Subset<T, Processed_Sensor_DataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Processed_Sensor_DataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Processed_Sensor_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Processed_Sensor_DataAggregateArgs>(args: Subset<T, Processed_Sensor_DataAggregateArgs>): Prisma.PrismaPromise<GetProcessed_Sensor_DataAggregateType<T>>

    /**
     * Group by Processed_Sensor_Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Processed_Sensor_DataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Processed_Sensor_DataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Processed_Sensor_DataGroupByArgs['orderBy'] }
        : { orderBy?: Processed_Sensor_DataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Processed_Sensor_DataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessed_Sensor_DataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Processed_Sensor_Data model
   */
  readonly fields: Processed_Sensor_DataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Processed_Sensor_Data.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Processed_Sensor_DataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Processed_Sensor_Data model
   */
  interface Processed_Sensor_DataFieldRefs {
    readonly data_id: FieldRef<"Processed_Sensor_Data", 'Int'>
    readonly timestamp: FieldRef<"Processed_Sensor_Data", 'DateTime'>
    readonly nitrogen: FieldRef<"Processed_Sensor_Data", 'Float'>
    readonly phosphorus: FieldRef<"Processed_Sensor_Data", 'Float'>
    readonly potassium: FieldRef<"Processed_Sensor_Data", 'Float'>
    readonly pH: FieldRef<"Processed_Sensor_Data", 'Float'>
    readonly moisture: FieldRef<"Processed_Sensor_Data", 'Float'>
    readonly temperature: FieldRef<"Processed_Sensor_Data", 'Float'>
    readonly session_id: FieldRef<"Processed_Sensor_Data", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Processed_Sensor_Data findUnique
   */
  export type Processed_Sensor_DataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * Filter, which Processed_Sensor_Data to fetch.
     */
    where: Processed_Sensor_DataWhereUniqueInput
  }

  /**
   * Processed_Sensor_Data findUniqueOrThrow
   */
  export type Processed_Sensor_DataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * Filter, which Processed_Sensor_Data to fetch.
     */
    where: Processed_Sensor_DataWhereUniqueInput
  }

  /**
   * Processed_Sensor_Data findFirst
   */
  export type Processed_Sensor_DataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * Filter, which Processed_Sensor_Data to fetch.
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processed_Sensor_Data to fetch.
     */
    orderBy?: Processed_Sensor_DataOrderByWithRelationInput | Processed_Sensor_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Processed_Sensor_Data.
     */
    cursor?: Processed_Sensor_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processed_Sensor_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processed_Sensor_Data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Processed_Sensor_Data.
     */
    distinct?: Processed_Sensor_DataScalarFieldEnum | Processed_Sensor_DataScalarFieldEnum[]
  }

  /**
   * Processed_Sensor_Data findFirstOrThrow
   */
  export type Processed_Sensor_DataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * Filter, which Processed_Sensor_Data to fetch.
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processed_Sensor_Data to fetch.
     */
    orderBy?: Processed_Sensor_DataOrderByWithRelationInput | Processed_Sensor_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Processed_Sensor_Data.
     */
    cursor?: Processed_Sensor_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processed_Sensor_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processed_Sensor_Data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Processed_Sensor_Data.
     */
    distinct?: Processed_Sensor_DataScalarFieldEnum | Processed_Sensor_DataScalarFieldEnum[]
  }

  /**
   * Processed_Sensor_Data findMany
   */
  export type Processed_Sensor_DataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * Filter, which Processed_Sensor_Data to fetch.
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processed_Sensor_Data to fetch.
     */
    orderBy?: Processed_Sensor_DataOrderByWithRelationInput | Processed_Sensor_DataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Processed_Sensor_Data.
     */
    cursor?: Processed_Sensor_DataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processed_Sensor_Data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processed_Sensor_Data.
     */
    skip?: number
    distinct?: Processed_Sensor_DataScalarFieldEnum | Processed_Sensor_DataScalarFieldEnum[]
  }

  /**
   * Processed_Sensor_Data create
   */
  export type Processed_Sensor_DataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * The data needed to create a Processed_Sensor_Data.
     */
    data: XOR<Processed_Sensor_DataCreateInput, Processed_Sensor_DataUncheckedCreateInput>
  }

  /**
   * Processed_Sensor_Data createMany
   */
  export type Processed_Sensor_DataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Processed_Sensor_Data.
     */
    data: Processed_Sensor_DataCreateManyInput | Processed_Sensor_DataCreateManyInput[]
  }

  /**
   * Processed_Sensor_Data createManyAndReturn
   */
  export type Processed_Sensor_DataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * The data used to create many Processed_Sensor_Data.
     */
    data: Processed_Sensor_DataCreateManyInput | Processed_Sensor_DataCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Processed_Sensor_Data update
   */
  export type Processed_Sensor_DataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * The data needed to update a Processed_Sensor_Data.
     */
    data: XOR<Processed_Sensor_DataUpdateInput, Processed_Sensor_DataUncheckedUpdateInput>
    /**
     * Choose, which Processed_Sensor_Data to update.
     */
    where: Processed_Sensor_DataWhereUniqueInput
  }

  /**
   * Processed_Sensor_Data updateMany
   */
  export type Processed_Sensor_DataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Processed_Sensor_Data.
     */
    data: XOR<Processed_Sensor_DataUpdateManyMutationInput, Processed_Sensor_DataUncheckedUpdateManyInput>
    /**
     * Filter which Processed_Sensor_Data to update
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * Limit how many Processed_Sensor_Data to update.
     */
    limit?: number
  }

  /**
   * Processed_Sensor_Data updateManyAndReturn
   */
  export type Processed_Sensor_DataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * The data used to update Processed_Sensor_Data.
     */
    data: XOR<Processed_Sensor_DataUpdateManyMutationInput, Processed_Sensor_DataUncheckedUpdateManyInput>
    /**
     * Filter which Processed_Sensor_Data to update
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * Limit how many Processed_Sensor_Data to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Processed_Sensor_Data upsert
   */
  export type Processed_Sensor_DataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * The filter to search for the Processed_Sensor_Data to update in case it exists.
     */
    where: Processed_Sensor_DataWhereUniqueInput
    /**
     * In case the Processed_Sensor_Data found by the `where` argument doesn't exist, create a new Processed_Sensor_Data with this data.
     */
    create: XOR<Processed_Sensor_DataCreateInput, Processed_Sensor_DataUncheckedCreateInput>
    /**
     * In case the Processed_Sensor_Data was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Processed_Sensor_DataUpdateInput, Processed_Sensor_DataUncheckedUpdateInput>
  }

  /**
   * Processed_Sensor_Data delete
   */
  export type Processed_Sensor_DataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
    /**
     * Filter which Processed_Sensor_Data to delete.
     */
    where: Processed_Sensor_DataWhereUniqueInput
  }

  /**
   * Processed_Sensor_Data deleteMany
   */
  export type Processed_Sensor_DataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Processed_Sensor_Data to delete
     */
    where?: Processed_Sensor_DataWhereInput
    /**
     * Limit how many Processed_Sensor_Data to delete.
     */
    limit?: number
  }

  /**
   * Processed_Sensor_Data without action
   */
  export type Processed_Sensor_DataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Processed_Sensor_Data
     */
    select?: Processed_Sensor_DataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Processed_Sensor_Data
     */
    omit?: Processed_Sensor_DataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Processed_Sensor_DataInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DeviceScalarFieldEnum: {
    device_id: 'device_id',
    device_name: 'device_name'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    session_id: 'session_id',
    timestamp_start: 'timestamp_start',
    timestamp_end: 'timestamp_end',
    location: 'location',
    device_id: 'device_id'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const Processed_Sensor_DataScalarFieldEnum: {
    data_id: 'data_id',
    timestamp: 'timestamp',
    nitrogen: 'nitrogen',
    phosphorus: 'phosphorus',
    potassium: 'potassium',
    pH: 'pH',
    moisture: 'moisture',
    temperature: 'temperature',
    session_id: 'session_id'
  };

  export type Processed_Sensor_DataScalarFieldEnum = (typeof Processed_Sensor_DataScalarFieldEnum)[keyof typeof Processed_Sensor_DataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    device_id?: IntFilter<"Device"> | number
    device_name?: StringNullableFilter<"Device"> | string | null
    sessions?: SessionListRelationFilter
  }

  export type DeviceOrderByWithRelationInput = {
    device_id?: SortOrder
    device_name?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    device_id?: number
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    device_name?: StringNullableFilter<"Device"> | string | null
    sessions?: SessionListRelationFilter
  }, "device_id">

  export type DeviceOrderByWithAggregationInput = {
    device_id?: SortOrder
    device_name?: SortOrderInput | SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _avg?: DeviceAvgOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
    _sum?: DeviceSumOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    device_id?: IntWithAggregatesFilter<"Device"> | number
    device_name?: StringNullableWithAggregatesFilter<"Device"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    session_id?: IntFilter<"Session"> | number
    timestamp_start?: DateTimeNullableFilter<"Session"> | Date | string | null
    timestamp_end?: DateTimeNullableFilter<"Session"> | Date | string | null
    location?: StringNullableFilter<"Session"> | string | null
    device_id?: IntFilter<"Session"> | number
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
    processedData?: Processed_Sensor_DataListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    session_id?: SortOrder
    timestamp_start?: SortOrderInput | SortOrder
    timestamp_end?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    device_id?: SortOrder
    device?: DeviceOrderByWithRelationInput
    processedData?: Processed_Sensor_DataOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    session_id?: number
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    timestamp_start?: DateTimeNullableFilter<"Session"> | Date | string | null
    timestamp_end?: DateTimeNullableFilter<"Session"> | Date | string | null
    location?: StringNullableFilter<"Session"> | string | null
    device_id?: IntFilter<"Session"> | number
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
    processedData?: Processed_Sensor_DataListRelationFilter
  }, "session_id">

  export type SessionOrderByWithAggregationInput = {
    session_id?: SortOrder
    timestamp_start?: SortOrderInput | SortOrder
    timestamp_end?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    device_id?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    session_id?: IntWithAggregatesFilter<"Session"> | number
    timestamp_start?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    timestamp_end?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    location?: StringNullableWithAggregatesFilter<"Session"> | string | null
    device_id?: IntWithAggregatesFilter<"Session"> | number
  }

  export type Processed_Sensor_DataWhereInput = {
    AND?: Processed_Sensor_DataWhereInput | Processed_Sensor_DataWhereInput[]
    OR?: Processed_Sensor_DataWhereInput[]
    NOT?: Processed_Sensor_DataWhereInput | Processed_Sensor_DataWhereInput[]
    data_id?: IntFilter<"Processed_Sensor_Data"> | number
    timestamp?: DateTimeNullableFilter<"Processed_Sensor_Data"> | Date | string | null
    nitrogen?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    phosphorus?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    potassium?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    pH?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    moisture?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    temperature?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    session_id?: IntFilter<"Processed_Sensor_Data"> | number
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type Processed_Sensor_DataOrderByWithRelationInput = {
    data_id?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    nitrogen?: SortOrderInput | SortOrder
    phosphorus?: SortOrderInput | SortOrder
    potassium?: SortOrderInput | SortOrder
    pH?: SortOrderInput | SortOrder
    moisture?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    session_id?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type Processed_Sensor_DataWhereUniqueInput = Prisma.AtLeast<{
    data_id?: number
    AND?: Processed_Sensor_DataWhereInput | Processed_Sensor_DataWhereInput[]
    OR?: Processed_Sensor_DataWhereInput[]
    NOT?: Processed_Sensor_DataWhereInput | Processed_Sensor_DataWhereInput[]
    timestamp?: DateTimeNullableFilter<"Processed_Sensor_Data"> | Date | string | null
    nitrogen?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    phosphorus?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    potassium?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    pH?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    moisture?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    temperature?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    session_id?: IntFilter<"Processed_Sensor_Data"> | number
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "data_id">

  export type Processed_Sensor_DataOrderByWithAggregationInput = {
    data_id?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    nitrogen?: SortOrderInput | SortOrder
    phosphorus?: SortOrderInput | SortOrder
    potassium?: SortOrderInput | SortOrder
    pH?: SortOrderInput | SortOrder
    moisture?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    session_id?: SortOrder
    _count?: Processed_Sensor_DataCountOrderByAggregateInput
    _avg?: Processed_Sensor_DataAvgOrderByAggregateInput
    _max?: Processed_Sensor_DataMaxOrderByAggregateInput
    _min?: Processed_Sensor_DataMinOrderByAggregateInput
    _sum?: Processed_Sensor_DataSumOrderByAggregateInput
  }

  export type Processed_Sensor_DataScalarWhereWithAggregatesInput = {
    AND?: Processed_Sensor_DataScalarWhereWithAggregatesInput | Processed_Sensor_DataScalarWhereWithAggregatesInput[]
    OR?: Processed_Sensor_DataScalarWhereWithAggregatesInput[]
    NOT?: Processed_Sensor_DataScalarWhereWithAggregatesInput | Processed_Sensor_DataScalarWhereWithAggregatesInput[]
    data_id?: IntWithAggregatesFilter<"Processed_Sensor_Data"> | number
    timestamp?: DateTimeNullableWithAggregatesFilter<"Processed_Sensor_Data"> | Date | string | null
    nitrogen?: FloatNullableWithAggregatesFilter<"Processed_Sensor_Data"> | number | null
    phosphorus?: FloatNullableWithAggregatesFilter<"Processed_Sensor_Data"> | number | null
    potassium?: FloatNullableWithAggregatesFilter<"Processed_Sensor_Data"> | number | null
    pH?: FloatNullableWithAggregatesFilter<"Processed_Sensor_Data"> | number | null
    moisture?: FloatNullableWithAggregatesFilter<"Processed_Sensor_Data"> | number | null
    temperature?: FloatNullableWithAggregatesFilter<"Processed_Sensor_Data"> | number | null
    session_id?: IntWithAggregatesFilter<"Processed_Sensor_Data"> | number
  }

  export type DeviceCreateInput = {
    device_name?: string | null
    sessions?: SessionCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    device_id?: number
    device_name?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUpdateInput = {
    device_name?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    device_id?: IntFieldUpdateOperationsInput | number
    device_name?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    device_id?: number
    device_name?: string | null
  }

  export type DeviceUpdateManyMutationInput = {
    device_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceUncheckedUpdateManyInput = {
    device_id?: IntFieldUpdateOperationsInput | number
    device_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    device: DeviceCreateNestedOneWithoutSessionsInput
    processedData?: Processed_Sensor_DataCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    session_id?: number
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    device_id: number
    processedData?: Processed_Sensor_DataUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    device?: DeviceUpdateOneRequiredWithoutSessionsNestedInput
    processedData?: Processed_Sensor_DataUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    device_id?: IntFieldUpdateOperationsInput | number
    processedData?: Processed_Sensor_DataUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    session_id?: number
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    device_id: number
  }

  export type SessionUpdateManyMutationInput = {
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    device_id?: IntFieldUpdateOperationsInput | number
  }

  export type Processed_Sensor_DataCreateInput = {
    timestamp?: Date | string | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    pH?: number | null
    moisture?: number | null
    temperature?: number | null
    session: SessionCreateNestedOneWithoutProcessedDataInput
  }

  export type Processed_Sensor_DataUncheckedCreateInput = {
    data_id?: number
    timestamp?: Date | string | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    pH?: number | null
    moisture?: number | null
    temperature?: number | null
    session_id: number
  }

  export type Processed_Sensor_DataUpdateInput = {
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    session?: SessionUpdateOneRequiredWithoutProcessedDataNestedInput
  }

  export type Processed_Sensor_DataUncheckedUpdateInput = {
    data_id?: IntFieldUpdateOperationsInput | number
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    session_id?: IntFieldUpdateOperationsInput | number
  }

  export type Processed_Sensor_DataCreateManyInput = {
    data_id?: number
    timestamp?: Date | string | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    pH?: number | null
    moisture?: number | null
    temperature?: number | null
    session_id: number
  }

  export type Processed_Sensor_DataUpdateManyMutationInput = {
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type Processed_Sensor_DataUncheckedUpdateManyInput = {
    data_id?: IntFieldUpdateOperationsInput | number
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    session_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceCountOrderByAggregateInput = {
    device_id?: SortOrder
    device_name?: SortOrder
  }

  export type DeviceAvgOrderByAggregateInput = {
    device_id?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    device_id?: SortOrder
    device_name?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    device_id?: SortOrder
    device_name?: SortOrder
  }

  export type DeviceSumOrderByAggregateInput = {
    device_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DeviceScalarRelationFilter = {
    is?: DeviceWhereInput
    isNot?: DeviceWhereInput
  }

  export type Processed_Sensor_DataListRelationFilter = {
    every?: Processed_Sensor_DataWhereInput
    some?: Processed_Sensor_DataWhereInput
    none?: Processed_Sensor_DataWhereInput
  }

  export type Processed_Sensor_DataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    session_id?: SortOrder
    timestamp_start?: SortOrder
    timestamp_end?: SortOrder
    location?: SortOrder
    device_id?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    session_id?: SortOrder
    device_id?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    session_id?: SortOrder
    timestamp_start?: SortOrder
    timestamp_end?: SortOrder
    location?: SortOrder
    device_id?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    session_id?: SortOrder
    timestamp_start?: SortOrder
    timestamp_end?: SortOrder
    location?: SortOrder
    device_id?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    session_id?: SortOrder
    device_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type Processed_Sensor_DataCountOrderByAggregateInput = {
    data_id?: SortOrder
    timestamp?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    pH?: SortOrder
    moisture?: SortOrder
    temperature?: SortOrder
    session_id?: SortOrder
  }

  export type Processed_Sensor_DataAvgOrderByAggregateInput = {
    data_id?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    pH?: SortOrder
    moisture?: SortOrder
    temperature?: SortOrder
    session_id?: SortOrder
  }

  export type Processed_Sensor_DataMaxOrderByAggregateInput = {
    data_id?: SortOrder
    timestamp?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    pH?: SortOrder
    moisture?: SortOrder
    temperature?: SortOrder
    session_id?: SortOrder
  }

  export type Processed_Sensor_DataMinOrderByAggregateInput = {
    data_id?: SortOrder
    timestamp?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    pH?: SortOrder
    moisture?: SortOrder
    temperature?: SortOrder
    session_id?: SortOrder
  }

  export type Processed_Sensor_DataSumOrderByAggregateInput = {
    data_id?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    pH?: SortOrder
    moisture?: SortOrder
    temperature?: SortOrder
    session_id?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutDeviceInput = {
    create?: XOR<SessionCreateWithoutDeviceInput, SessionUncheckedCreateWithoutDeviceInput> | SessionCreateWithoutDeviceInput[] | SessionUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutDeviceInput | SessionCreateOrConnectWithoutDeviceInput[]
    createMany?: SessionCreateManyDeviceInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<SessionCreateWithoutDeviceInput, SessionUncheckedCreateWithoutDeviceInput> | SessionCreateWithoutDeviceInput[] | SessionUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutDeviceInput | SessionCreateOrConnectWithoutDeviceInput[]
    createMany?: SessionCreateManyDeviceInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SessionUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<SessionCreateWithoutDeviceInput, SessionUncheckedCreateWithoutDeviceInput> | SessionCreateWithoutDeviceInput[] | SessionUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutDeviceInput | SessionCreateOrConnectWithoutDeviceInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutDeviceInput | SessionUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: SessionCreateManyDeviceInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutDeviceInput | SessionUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutDeviceInput | SessionUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<SessionCreateWithoutDeviceInput, SessionUncheckedCreateWithoutDeviceInput> | SessionCreateWithoutDeviceInput[] | SessionUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutDeviceInput | SessionCreateOrConnectWithoutDeviceInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutDeviceInput | SessionUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: SessionCreateManyDeviceInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutDeviceInput | SessionUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutDeviceInput | SessionUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type DeviceCreateNestedOneWithoutSessionsInput = {
    create?: XOR<DeviceCreateWithoutSessionsInput, DeviceUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutSessionsInput
    connect?: DeviceWhereUniqueInput
  }

  export type Processed_Sensor_DataCreateNestedManyWithoutSessionInput = {
    create?: XOR<Processed_Sensor_DataCreateWithoutSessionInput, Processed_Sensor_DataUncheckedCreateWithoutSessionInput> | Processed_Sensor_DataCreateWithoutSessionInput[] | Processed_Sensor_DataUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: Processed_Sensor_DataCreateOrConnectWithoutSessionInput | Processed_Sensor_DataCreateOrConnectWithoutSessionInput[]
    createMany?: Processed_Sensor_DataCreateManySessionInputEnvelope
    connect?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
  }

  export type Processed_Sensor_DataUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<Processed_Sensor_DataCreateWithoutSessionInput, Processed_Sensor_DataUncheckedCreateWithoutSessionInput> | Processed_Sensor_DataCreateWithoutSessionInput[] | Processed_Sensor_DataUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: Processed_Sensor_DataCreateOrConnectWithoutSessionInput | Processed_Sensor_DataCreateOrConnectWithoutSessionInput[]
    createMany?: Processed_Sensor_DataCreateManySessionInputEnvelope
    connect?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DeviceUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<DeviceCreateWithoutSessionsInput, DeviceUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutSessionsInput
    upsert?: DeviceUpsertWithoutSessionsInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutSessionsInput, DeviceUpdateWithoutSessionsInput>, DeviceUncheckedUpdateWithoutSessionsInput>
  }

  export type Processed_Sensor_DataUpdateManyWithoutSessionNestedInput = {
    create?: XOR<Processed_Sensor_DataCreateWithoutSessionInput, Processed_Sensor_DataUncheckedCreateWithoutSessionInput> | Processed_Sensor_DataCreateWithoutSessionInput[] | Processed_Sensor_DataUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: Processed_Sensor_DataCreateOrConnectWithoutSessionInput | Processed_Sensor_DataCreateOrConnectWithoutSessionInput[]
    upsert?: Processed_Sensor_DataUpsertWithWhereUniqueWithoutSessionInput | Processed_Sensor_DataUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: Processed_Sensor_DataCreateManySessionInputEnvelope
    set?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    disconnect?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    delete?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    connect?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    update?: Processed_Sensor_DataUpdateWithWhereUniqueWithoutSessionInput | Processed_Sensor_DataUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: Processed_Sensor_DataUpdateManyWithWhereWithoutSessionInput | Processed_Sensor_DataUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: Processed_Sensor_DataScalarWhereInput | Processed_Sensor_DataScalarWhereInput[]
  }

  export type Processed_Sensor_DataUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<Processed_Sensor_DataCreateWithoutSessionInput, Processed_Sensor_DataUncheckedCreateWithoutSessionInput> | Processed_Sensor_DataCreateWithoutSessionInput[] | Processed_Sensor_DataUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: Processed_Sensor_DataCreateOrConnectWithoutSessionInput | Processed_Sensor_DataCreateOrConnectWithoutSessionInput[]
    upsert?: Processed_Sensor_DataUpsertWithWhereUniqueWithoutSessionInput | Processed_Sensor_DataUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: Processed_Sensor_DataCreateManySessionInputEnvelope
    set?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    disconnect?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    delete?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    connect?: Processed_Sensor_DataWhereUniqueInput | Processed_Sensor_DataWhereUniqueInput[]
    update?: Processed_Sensor_DataUpdateWithWhereUniqueWithoutSessionInput | Processed_Sensor_DataUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: Processed_Sensor_DataUpdateManyWithWhereWithoutSessionInput | Processed_Sensor_DataUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: Processed_Sensor_DataScalarWhereInput | Processed_Sensor_DataScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutProcessedDataInput = {
    create?: XOR<SessionCreateWithoutProcessedDataInput, SessionUncheckedCreateWithoutProcessedDataInput>
    connectOrCreate?: SessionCreateOrConnectWithoutProcessedDataInput
    connect?: SessionWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUpdateOneRequiredWithoutProcessedDataNestedInput = {
    create?: XOR<SessionCreateWithoutProcessedDataInput, SessionUncheckedCreateWithoutProcessedDataInput>
    connectOrCreate?: SessionCreateOrConnectWithoutProcessedDataInput
    upsert?: SessionUpsertWithoutProcessedDataInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutProcessedDataInput, SessionUpdateWithoutProcessedDataInput>, SessionUncheckedUpdateWithoutProcessedDataInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SessionCreateWithoutDeviceInput = {
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    processedData?: Processed_Sensor_DataCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutDeviceInput = {
    session_id?: number
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    processedData?: Processed_Sensor_DataUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutDeviceInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutDeviceInput, SessionUncheckedCreateWithoutDeviceInput>
  }

  export type SessionCreateManyDeviceInputEnvelope = {
    data: SessionCreateManyDeviceInput | SessionCreateManyDeviceInput[]
  }

  export type SessionUpsertWithWhereUniqueWithoutDeviceInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutDeviceInput, SessionUncheckedUpdateWithoutDeviceInput>
    create: XOR<SessionCreateWithoutDeviceInput, SessionUncheckedCreateWithoutDeviceInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutDeviceInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutDeviceInput, SessionUncheckedUpdateWithoutDeviceInput>
  }

  export type SessionUpdateManyWithWhereWithoutDeviceInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutDeviceInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    session_id?: IntFilter<"Session"> | number
    timestamp_start?: DateTimeNullableFilter<"Session"> | Date | string | null
    timestamp_end?: DateTimeNullableFilter<"Session"> | Date | string | null
    location?: StringNullableFilter<"Session"> | string | null
    device_id?: IntFilter<"Session"> | number
  }

  export type DeviceCreateWithoutSessionsInput = {
    device_name?: string | null
  }

  export type DeviceUncheckedCreateWithoutSessionsInput = {
    device_id?: number
    device_name?: string | null
  }

  export type DeviceCreateOrConnectWithoutSessionsInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutSessionsInput, DeviceUncheckedCreateWithoutSessionsInput>
  }

  export type Processed_Sensor_DataCreateWithoutSessionInput = {
    timestamp?: Date | string | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    pH?: number | null
    moisture?: number | null
    temperature?: number | null
  }

  export type Processed_Sensor_DataUncheckedCreateWithoutSessionInput = {
    data_id?: number
    timestamp?: Date | string | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    pH?: number | null
    moisture?: number | null
    temperature?: number | null
  }

  export type Processed_Sensor_DataCreateOrConnectWithoutSessionInput = {
    where: Processed_Sensor_DataWhereUniqueInput
    create: XOR<Processed_Sensor_DataCreateWithoutSessionInput, Processed_Sensor_DataUncheckedCreateWithoutSessionInput>
  }

  export type Processed_Sensor_DataCreateManySessionInputEnvelope = {
    data: Processed_Sensor_DataCreateManySessionInput | Processed_Sensor_DataCreateManySessionInput[]
  }

  export type DeviceUpsertWithoutSessionsInput = {
    update: XOR<DeviceUpdateWithoutSessionsInput, DeviceUncheckedUpdateWithoutSessionsInput>
    create: XOR<DeviceCreateWithoutSessionsInput, DeviceUncheckedCreateWithoutSessionsInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutSessionsInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutSessionsInput, DeviceUncheckedUpdateWithoutSessionsInput>
  }

  export type DeviceUpdateWithoutSessionsInput = {
    device_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeviceUncheckedUpdateWithoutSessionsInput = {
    device_id?: IntFieldUpdateOperationsInput | number
    device_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Processed_Sensor_DataUpsertWithWhereUniqueWithoutSessionInput = {
    where: Processed_Sensor_DataWhereUniqueInput
    update: XOR<Processed_Sensor_DataUpdateWithoutSessionInput, Processed_Sensor_DataUncheckedUpdateWithoutSessionInput>
    create: XOR<Processed_Sensor_DataCreateWithoutSessionInput, Processed_Sensor_DataUncheckedCreateWithoutSessionInput>
  }

  export type Processed_Sensor_DataUpdateWithWhereUniqueWithoutSessionInput = {
    where: Processed_Sensor_DataWhereUniqueInput
    data: XOR<Processed_Sensor_DataUpdateWithoutSessionInput, Processed_Sensor_DataUncheckedUpdateWithoutSessionInput>
  }

  export type Processed_Sensor_DataUpdateManyWithWhereWithoutSessionInput = {
    where: Processed_Sensor_DataScalarWhereInput
    data: XOR<Processed_Sensor_DataUpdateManyMutationInput, Processed_Sensor_DataUncheckedUpdateManyWithoutSessionInput>
  }

  export type Processed_Sensor_DataScalarWhereInput = {
    AND?: Processed_Sensor_DataScalarWhereInput | Processed_Sensor_DataScalarWhereInput[]
    OR?: Processed_Sensor_DataScalarWhereInput[]
    NOT?: Processed_Sensor_DataScalarWhereInput | Processed_Sensor_DataScalarWhereInput[]
    data_id?: IntFilter<"Processed_Sensor_Data"> | number
    timestamp?: DateTimeNullableFilter<"Processed_Sensor_Data"> | Date | string | null
    nitrogen?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    phosphorus?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    potassium?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    pH?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    moisture?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    temperature?: FloatNullableFilter<"Processed_Sensor_Data"> | number | null
    session_id?: IntFilter<"Processed_Sensor_Data"> | number
  }

  export type SessionCreateWithoutProcessedDataInput = {
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    device: DeviceCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutProcessedDataInput = {
    session_id?: number
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
    device_id: number
  }

  export type SessionCreateOrConnectWithoutProcessedDataInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutProcessedDataInput, SessionUncheckedCreateWithoutProcessedDataInput>
  }

  export type SessionUpsertWithoutProcessedDataInput = {
    update: XOR<SessionUpdateWithoutProcessedDataInput, SessionUncheckedUpdateWithoutProcessedDataInput>
    create: XOR<SessionCreateWithoutProcessedDataInput, SessionUncheckedCreateWithoutProcessedDataInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutProcessedDataInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutProcessedDataInput, SessionUncheckedUpdateWithoutProcessedDataInput>
  }

  export type SessionUpdateWithoutProcessedDataInput = {
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    device?: DeviceUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutProcessedDataInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    device_id?: IntFieldUpdateOperationsInput | number
  }

  export type SessionCreateManyDeviceInput = {
    session_id?: number
    timestamp_start?: Date | string | null
    timestamp_end?: Date | string | null
    location?: string | null
  }

  export type SessionUpdateWithoutDeviceInput = {
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    processedData?: Processed_Sensor_DataUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutDeviceInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    processedData?: Processed_Sensor_DataUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutDeviceInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    timestamp_start?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timestamp_end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Processed_Sensor_DataCreateManySessionInput = {
    data_id?: number
    timestamp?: Date | string | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    pH?: number | null
    moisture?: number | null
    temperature?: number | null
  }

  export type Processed_Sensor_DataUpdateWithoutSessionInput = {
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type Processed_Sensor_DataUncheckedUpdateWithoutSessionInput = {
    data_id?: IntFieldUpdateOperationsInput | number
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type Processed_Sensor_DataUncheckedUpdateManyWithoutSessionInput = {
    data_id?: IntFieldUpdateOperationsInput | number
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    pH?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}