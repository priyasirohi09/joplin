import React from 'react';

const CloudSyncComponent = () => {
	const providers = [
		{ name: 'Joplin Cloud', value: 'joplin' },
		{ name: 'Dropbox', value: 'dropbox' },
		{ name: 'OneDrive', value: 'onedrive' },
		{ name: 'Google Drive', value: 'google' },
	];

	const handleProviderSelect = (provider) => {
		window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/${provider}`;
	};

	return (
		<div>
			<h2>Select a Provider to Sync Your Notes</h2>
			<div className="provider-list">
				{providers.map((provider) => (
					<button
						key={provider.value}
						onClick={() => handleProviderSelect(provider.value)}
						className="provider-button"
					>
						{provider.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default CloudSyncComponent;
