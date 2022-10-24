export default function PlaytechPoker({ isMobile, externalId, sessionId }) {

    iapiSetCallout('ValidateLoginSession', calloutValidateLoginSession);
    iapiSetCallout('GetLoggedInPlayer', calloutGetLoggedInPlayer);

    function getLoggedInPlayer() {
        var realMode = 1;
        iapiGetLoggedInPlayer(realMode);
    }


    function calloutGetTemporaryAuthenticationToken(response) {
        if (response.errorCode) {
            alert("Temp token failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage);
        } else {
            alert("Temp token success, token:" + response.sessionToken.sessionToken);
        }
    };

    function calloutGetWaitingMessages(response) {
        if (response.errorCode) {
            alert("Messages failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage);
        } else {
            alert("Messages success");
            if (response.actions) {
                alert("Madis");
            }
        }
    }

    function calloutValidateLoginSession(response) {
        if (response.errorCode) {
            alert("Session validation failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage);
        } else {
            alert("Session validation success.");
            if (response.SessionValidationByPasswordChangeData) {
                alert("Session validation, password change");
            }
            if (response.SessionValidationByTCVersionData) {
                alert("Session validation accept tc, url:" + response.SessionValidationByTCVersionData[0].tcVersionUrl + " reference:" + response.SessionValidationByTCVersionData[0].termVersionReference);
            }
        }
    }

    function calloutSubmitDialog(response) {
        if (response.errorCode) { alert("Submit dialog failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage); }
        else { alert("Submit dialog success."); }
    }

    function calloutForgotPassword(response) {
        if (response.errorCode) { alert("Forgot password failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage); }
        else { alert("Forgot password success."); }
    }

    function calloutGetLoggedInPlayer(response) {
        if (response.errorCode) { alert("Get Logged In Player failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage); }
        else { alert("Get Logged In Player success, logged in:" + response.cookieExists); }
    }

    function calloutLogout(response) {
        if (response.errorCode) { alert("Logout failed, error:" + response.errorCode + " errorText:" + response.errorText + " playerMessage:" + response.playerMessage); }
        else { alert("Logout success."); }
    }

    function login(user, session) {
        var realMode = 1;
        iapiSetAuthenticationType("externalToken");
        iapiLogin(user, session, realMode, "en");
    }
    
    function calloutLogin(response){
        if(!response.errorCode && window.location.href.includes('startWebclient')){
            window.location.href = 'https://games.casinobarcelona.es/poker/web/WebLauncher.html';
        }
    }
    
    iapiSetCallout('Login', calloutLogin);

    if(isMobile) iapiSetClientPlatform('mobile');

    login(externalId, sessionId);

}