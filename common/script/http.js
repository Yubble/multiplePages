let hostname = window.location.hostname == 'www.doraemon.com' ? '生产接口' : '开发接口'

export function $get (url) {
    console.log('到达了')
    console.log(hostname)
}