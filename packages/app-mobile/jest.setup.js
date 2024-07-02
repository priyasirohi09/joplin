/* eslint-disable jest/require-top-level-describe */

const { afterEachCleanUp, afterAllCleanUp } = require('@joplin/lib/testing/test-utils.js');
const { shimInit } = require('@joplin/lib/shim-init-node.js');
const { mkdir, rm } = require('fs-extra');
const path = require('path');
const { tmpdir } = require('os');
const uuid = require('@joplin/lib/uuid').default;
const sqlite3 = require('sqlite3');
const React = require('react');
require('../../jest.base-setup.js')();

import { setImmediate } from 'timers';

// Required by some libraries (setImmediate is not supported in most browsers,
// so is removed by jsdom).
window.setImmediate = setImmediate;

shimInit({
	nodeSqlite: sqlite3,
	React,
});

// This library has the following error when running within Jest:
//   Invariant Violation: `new NativeEventEmitter()` requires a non-null argument.
jest.mock('react-native-device-info', () => {
	return {
		hasNotch: () => false,
	};
});

// react-native-version-info doesn't work (returns undefined for .version) when
// running in a testing environment.
jest.doMock('react-native-version-info', () => {
	return {
		default: {
			appVersion: require('./package.json').version,
		},
	};
});

// react-native-webview expects native iOS/Android code so needs to be mocked.
jest.mock('react-native-webview', () => {
	const { View } = require('react-native');
	return {
		WebView: View,
	};
});

jest.mock('@react-native-clipboard/clipboard', () => {
	return { default: { getString: jest.fn(), setString: jest.fn() } };
});

// react-native-fs's CachesDirectoryPath export doesn't work in a testing environment.
// Use a temporary folder instead.
const tempDirectoryPath = path.join(tmpdir(), `appmobile-test-${uuid.createNano()}`);

jest.doMock('react-native-fs', () => {
	return {
		CachesDirectoryPath: tempDirectoryPath,
	};
});

beforeAll(async () => {
	await mkdir(tempDirectoryPath);
});

afterEach(async () => {
	await afterEachCleanUp();
});

afterAll(async () => {
	await afterAllCleanUp();
	await rm(tempDirectoryPath, { recursive: true });
});
