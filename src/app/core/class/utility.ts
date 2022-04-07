import { snakeCase, mapKeys, camelCase } from "lodash";

export class Utility {
  /**
   * To convert an object into Request query string
   * @param object - an object having key-value pair
   */
  public static serializeQuery(object: unknown) {
    return Object.entries(object)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
  }

  /**
   * Convert an object key-values to snake case
   * @param input - an input object to be converted
   */
  public static transformToSnakeCase = <T>(input: any): T =>
    (typeof input === "string" && snakeCase(input)) || mapKeys(input, (_, key) => snakeCase(key));

  /**
   * Convert an object key-values to camel case
   * @param input - an object needs to be converted
   */
  public static transformToCamelCase = <T>(input: any): T =>
    (typeof input === "string" && camelCase(input)) || mapKeys(input, (_, key) => camelCase(key));

  /**
   * Transform an array and pivot
   * @param m - an array to be transformed
   */
  public static transpose = (m) => (m.length && m[0].map((_, i) => m.map((x) => x[i]))) || [];
}
