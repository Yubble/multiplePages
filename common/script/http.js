let hostname = '';
if (Env == 'pro') {
    hostname = 'https://app.doraemoney.com/';
} else {
    hostname = 'https://apptest.doraemoney.com/';
}

export function $get (url, data) {
    return new Promise((resolve, reject) => {
        $.get(hostname + url, data, (result, status) => {
            if (status == 'success') {
                resolve(result);
            } else {
                reject();
            }
        });
    });
}

export function $post (url, data, fn) {
    return new Promise((resolve, reject) => {
        $.post(hostname + url, data, (result, status) => {
            if (status == 'success') {
                resolve(result);
            } else {
                reject();
            }
        });
    });
}