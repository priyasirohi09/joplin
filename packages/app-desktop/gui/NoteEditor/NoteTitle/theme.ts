export enum ThemeAppearance {
	Light = 'light',
	Dark = 'dark',
}

export interface Theme {
	appearance: ThemeAppearance;

	backgroundColor: string;
	backgroundColorTransparent: string;
	oddBackgroundColor: string;
	color: string;
	colorError: string;
	colorCorrect: string;
	colorWarn: string;
	colorWarnUrl: string;
	colorFaded: string;
	dividerColor: string;
	selectedColor: string;
	urlColor: string;

	backgroundColor2: string;
	color2: string;
	selectedColor2: string;
	colorError2: string;
	colorWarn2: string;
	colorWarn3: string;

	backgroundColor3: string;
	backgroundColorHover3: string;
	color3: string;

	backgroundColor4: string;
	color4: string;

	backgroundColor5?: string;
	color5?: string;

	raisedBackgroundColor: string;
	raisedColor: string;
	searchMarkerBackgroundColor: string;
	searchMarkerColor: string;

	warningBackgroundColor: string;
	destructiveColor: string;

	tableBackgroundColor: string;
	codeBackgroundColor: string;
	codeBorderColor: string;
	codeColor: string;

	blockQuoteOpacity: number;

	codeMirrorTheme: string;
	codeThemeCss: string;

	highlightedColor?: string;

	headerBackgroundColor: string;
	textSelectionColor: string;
	colorBright2: string;
}
