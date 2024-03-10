if ("serviceWorker" in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log("registration-注册成功---");
            console.log(registration);
        }).catch((registrationError) => {
            console.log("registrationError--注册失败--");
            console.log(registrationError);
        })
    })
}
