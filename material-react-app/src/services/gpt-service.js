import HttpService from "./htttp.service";

class GPTService {
  // authEndpoint = process.env.API_URL;

  generateandsendAppleMusic = async (payload) => {
    const generateandsendAppleMusic = 'generateandsend-AppleMusic';
    return await HttpService.post(generateandsendAppleMusic, payload);
  };
  generateAppleMusic = async (payload) => {
    const generateAppleMusic = 'generate-AppleMusic';
    return await HttpService.post(generateAppleMusic, payload);
  };

  sendAppleMusic = async (payload) => {
    const sendAppleMusicEndpoint = 'send-AppleMusic';
    return await HttpService.post(sendAppleMusicEndpoint, payload);
  };
  generateWordpress = async (payload) => {
    const generateWordpressEndpoint = 'generate-Wordpress';
    return await HttpService.post(generateWordpressEndpoint, payload);
  };

  oauthWordpress = async (payload) => {
    const oauthWordpressEndpoint = 'auth/wordpress';
    return await HttpService.post(oauthWordpressEndpoint, payload);
  };
  oauthWordpressCallback = async (payload) => {
    const oauthWordpressCallbackEndpoint = 'auth/wordpress/callback';
    return await HttpService.post(oauthWordpressCallbackEndpoint, payload);
  };
  fetchAPIUse = async (payload) => {
    const fetchAPIUse = 'fetch-apiUsage';
    return await HttpService.get(fetchAPIUse, payload);
  };

  saveWPSiteUrl = async (payload) => {
    const saveWPSiteUrl = 'saveSiteUrl';
    return await HttpService.post(saveWPSiteUrl, payload);
  };
  fetchWPSiteUrl = async (payload) => {
    const fetchWPSiteUrl = 'fetch-WPSiteURL';
    return await HttpService.post(fetchWPSiteUrl, payload);
  };
  fetchCustomSettings = async (payload) => {
    const fetchCustomSettings = 'fetch-settings';
    return await HttpService.get(fetchCustomSettings, payload);
  };

  saveCustomSettings = async (payload) => {
    const saveCustomSettings = 'save-settings';
    return await HttpService.post(saveCustomSettings, payload);
  };
}

export default new GPTService();
