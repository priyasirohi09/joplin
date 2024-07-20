import * as React from 'react';
import ToolbarButton from './ToolbarButton/ToolbarButton';
import ToggleEditorsButton, { Value } from './ToggleEditorsButton/ToggleEditorsButton';
import ToolbarSpace from './ToolbarSpace';
import { Dropdown } from './Dropdown/Dropdown';
const { connect } = require('react-redux');
const { themeStyle } = require('@joplin/lib/theme');

interface Props {
	themeId: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
	style: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
	items: any[];
	disabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
class ToolbarBaseComponent extends React.Component<Props, any> {

	public render() {
		const theme = themeStyle(this.props.themeId);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
		const style: any = { display: 'flex',
			flexDirection: 'row',
			boxSizing: 'border-box',
			backgroundColor: theme.backgroundColor3,
			padding: theme.toolbarPadding,
			paddingRight: theme.mainPadding, ...this.props.style };

		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
		const groupStyle: any = {
			display: 'flex',
			flexDirection: 'row',
			boxSizing: 'border-box',
			minWidth: 0,
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
		const leftItemComps: any[] = [];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
		const centerItemComps: any[] = [];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
		const rightItemComps: any[] = [];

		if (this.props.items) {
			for (let i = 0; i < this.props.items.length; i++) {
				const o = this.props.items[i];
				let key = o.iconName ? o.iconName : '';
				key += o.title ? o.title : '';
				key += o.name ? o.name : '';
				const itemType = !('type' in o) ? 'button' : o.type;

				if (!key) key = `${o.type}_${i}`;

				const props = {
					key: key,
					themeId: this.props.themeId,
					disabled: this.props.disabled,
					...o,
				};

				if (o.name === 'toggleEditors') {
					rightItemComps.push(<ToggleEditorsButton
						key={o.name}
						value={Value.Markdown}
						themeId={this.props.themeId}
						toolbarButtonInfo={o}
					/>);
				} else if (itemType === 'button') {
					const target = ['historyForward', 'historyBackward', 'toggleExternalEditing'].includes(o.name) ? leftItemComps : centerItemComps;
					target.push(<ToolbarButton {...props} />);
				} else if (itemType === 'separator') {
					centerItemComps.push(<ToolbarSpace {...props} />);
				}
			}
		}

		const fonts = {
			'Arial': 'Arial',
			'Georgia': 'Georgia',
			'Verdana': 'Verdana',
			'Times New Roman': 'Times New Roman',
			'Courier New': 'Courier New',
		};

		return (
			<div className="editor-toolbar" style={style}>
				<div style={groupStyle}>
					{leftItemComps}
				</div>
				<div style={groupStyle}>
					<ToolbarSpace themeId={1} />
					<Dropdown options={fonts} />
				</div>
				<div style={groupStyle}>
					{centerItemComps}
				</div>
				<div style={{ ...groupStyle, flex: 1, justifyContent: 'flex-end' }}>
					{rightItemComps}
				</div>
			</div>
		);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
const mapStateToProps = (state: any) => {
	return { themeId: state.settings.theme };
};

export default connect(mapStateToProps)(ToolbarBaseComponent);
