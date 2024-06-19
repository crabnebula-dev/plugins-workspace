// @ts-nocheck
// This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

/** user-defined commands **/

export const commands = {
  async getCurrentPosition(
    options: PositionOptions | null
  ): Promise<Result<Position, Error>> {
    try {
      return {
        status: "ok",
        data: await TAURI_INVOKE("plugin:geolocation|get_current_position", {
          options,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async watchPosition(
    options: PositionOptions,
    channel: Channel<Position>
  ): Promise<Result<null, Error>> {
    try {
      return {
        status: "ok",
        data: await TAURI_INVOKE("plugin:geolocation|watch_position", {
          options,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async clearWatch(channelId: number): Promise<Result<null, Error>> {
    try {
      return {
        status: "ok",
        data: await TAURI_INVOKE("plugin:geolocation|clear_watch", {
          channelId,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async checkPermissions(): Promise<Result<PermissionStatus, Error>> {
    try {
      return {
        status: "ok",
        data: await TAURI_INVOKE("plugin:geolocation|check_permissions"),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async requestPermissions(
    permissions: PermissionType[] | null
  ): Promise<Result<PermissionStatus, Error>> {
    try {
      return {
        status: "ok",
        data: await TAURI_INVOKE("plugin:geolocation|request_permissions", {
          permissions,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
};

/** user-defined events **/

export const events = __makeEvents__<{
  randomNumber: RandomNumber;
}>({
  randomNumber: "plugin:geolocation:random-number",
});

/** user-defined statics **/

/** user-defined types **/

export type Coordinates = {
  /**
   * Latitude in decimal degrees.
   */
  latitude: number;
  /**
   * Longitude in decimal degrees.
   */
  longitude: number;
  /**
   * Accuracy level of the latitude and longitude coordinates in meters.
   */
  accuracy: number;
  /**
   * Accuracy level of the altitude coordinate in meters, if available.
   * Available on all iOS versions and on Android 8 and above.
   */
  altitudeAccuracy: number | null;
  /**
   * The altitude the user is at, if available.
   */
  altitude: number | null;
  speed: number | null;
  /**
   * The heading the user is facing, if available.
   */
  heading: number | null;
};
export type Error = never;
/**
 * Permission state.
 */
export type PermissionState =
  /**
   * Permission access has been granted.
   */
  | "granted"
  /**
   * Permission access has been denied.
   */
  | "denied"
  /**
   * The end user should be prompted for permission.
   */
  | "prompt";
export type PermissionStatus = {
  /**
   * Permission state for the location alias.
   *
   * On Android it requests/checks both ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION permissions.
   *
   * On iOS it requests/checks location permissions.
   */
  location: PermissionState;
  /**
   * Permissions state for the coarseLoaction alias.
   *
   * On Android it requests/checks ACCESS_COARSE_LOCATION.
   *
   * On Android 12+, users can choose between Approximate location (ACCESS_COARSE_LOCATION) and Precise location (ACCESS_FINE_LOCATION).
   *
   * On iOS it will have the same value as the `location` alias.
   */
  coarseLocation: PermissionState;
};
export type PermissionType = "location" | "coarseLocation";
export type Position = {
  /**
   * Creation time for these coordinates.
   */
  timestamp: number;
  /**
   * The GPD coordinates along with the accuracy of the data.
   */
  coords: Coordinates;
};
export type PositionOptions = {
  /**
   * High accuracy mode (such as GPS, if available)
   * Will be ignored on Android 12+ if users didn't grant the ACCESS_FINE_LOCATION permission.
   */
  enableHighAccuracy: boolean;
  /**
   * The maximum wait time in milliseconds for location updates.
   * On Android the timeout gets ignored for getCurrentPosition.
   * Ignored on iOS
   */
  timeout: number;
  /**
   * The maximum age in milliseconds of a possible cached position that is acceptable to return.
   * Default: 0
   * Ignored on iOS
   */
  maximumAge: number;
};
export type RandomNumber = number;

/** tauri-specta globals **/

import { Channel, invoke as TAURI_INVOKE } from "@tauri-apps/api/core";
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindow as __WebviewWindow__ } from "@tauri-apps/api/webviewWindow";

type __EventObj__<T> = {
  listen: (
    cb: TAURI_API_EVENT.EventCallback<T>
  ) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
  once: (
    cb: TAURI_API_EVENT.EventCallback<T>
  ) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
  emit: T extends null
    ? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
    : (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

export type Result<T, E> =
  | { status: "ok"; data: T }
  | { status: "error"; error: E };

function __makeEvents__<T extends Record<string, any>>(
  mappings: Record<keyof T, string>
) {
  return new Proxy(
    {} as unknown as {
      [K in keyof T]: __EventObj__<T[K]> & {
        (handle: __WebviewWindow__): __EventObj__<T[K]>;
      };
    },
    {
      get: (_, event) => {
        const name = mappings[event as keyof T];

        return new Proxy((() => {}) as any, {
          apply: (_, __, [window]: [__WebviewWindow__]) => ({
            listen: (arg: any) => window.listen(name, arg),
            once: (arg: any) => window.once(name, arg),
            emit: (arg: any) => window.emit(name, arg),
          }),
          get: (_, command: keyof __EventObj__<any>) => {
            switch (command) {
              case "listen":
                return (arg: any) => TAURI_API_EVENT.listen(name, arg);
              case "once":
                return (arg: any) => TAURI_API_EVENT.once(name, arg);
              case "emit":
                return (arg: any) => TAURI_API_EVENT.emit(name, arg);
            }
          },
        });
      },
    }
  );
}
