const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

imgUrlBase = './assets/img-song/'
musicUrlBase = './assets/music/'


const songs = [
    {
        imgUrl: imgUrlBase + 'BuocQuaNhau.jpeg',
        music: 'Bước Qua Nhau',
        singer: 'Vũ',
        srcUrl: musicUrlBase + 'BuocQuaNhau-Vu-7120388.mp3'
    },
    {
        imgUrl: imgUrlBase + 'ChiLaKhongCungNhau.jpeg',
        music: 'Chỉ là không cùng nhau',
        singer: 'Tăng Phúc - Trương Thảo Nhi',
        srcUrl: musicUrlBase + 'ChiLaKhongCungNhauLive-TangPhucTruongThaoNhi-6994969.mp3'
    },
    {
        imgUrl: imgUrlBase + 'CoHenVoiThanhXuan.jpeg',
        music: 'Có Hẹn Với Thanh Xuân',
        singer: 'Freak D, MONSTAR',
        srcUrl: musicUrlBase + 'CoHenVoiThanhXuanLofiVersion-FreakDMONSTAR-7099591.mp3'
    },
    {
        imgUrl: imgUrlBase + 'DenDaKhongDuong.jpeg',
        music: 'Đen Đá Không Đường',
        singer: 'Amee',
        srcUrl: musicUrlBase + 'DenDaKhongDuongRapVersion-AMeeDMex-6009199.mp3'
    },
    {
        imgUrl: imgUrlBase + 'DomDom.jpeg',
        music: 'Đom Đóm',
        singer: 'Jack',
        srcUrl: musicUrlBase + 'Dom Dom - Jack.mp3'
    },
    {
        imgUrl: imgUrlBase + 'HaConVuongNang.jpeg',
        music: 'Hạ Còn Vương Nắng',
        singer: 'DatKaa',
        srcUrl: musicUrlBase + 'Ha Con Vuong Nang - DatKaa.mp3'
    },
    {
        imgUrl: imgUrlBase + 'MyLove.jpeg',
        music: 'My Love',
        singer: 'Westlife',
        srcUrl: musicUrlBase + 'MyLove-Westlife-6220006.mp3'
    },
    {
        imgUrl: imgUrlBase + 'NothingGonnaChangeMyLoveForYou.jpeg',
        music: 'Nothing Gonna Change My Love For You',
        singer: 'Westlife',
        srcUrl: musicUrlBase + 'NothingsGonnaChangeMyLoveForYou-Westlife-312928.mp3'
    },
    {
        imgUrl: imgUrlBase + 'ThangTuLoiNoiDoiCuaAnh.jpeg',
        music: 'Tháng tư lời nói dối của anh ',
        singer: 'Hà Anh Tuấn',
        srcUrl: musicUrlBase + 'Thang-4-La-Loi-Noi-Doi-Cua-Em-Ha-Anh-Tuan.mp3'
    },
    {
        imgUrl: imgUrlBase + 'TronTim.jpeg',
        music: 'Trốn Tìm',
        singer: 'Den MTV',
        srcUrl: musicUrlBase + 'Tron Tim - Den MTV (NhacPro.net).mp3'
    }
]

const defaultSong = songs[0]
// Header
const header = $('h2')
// CD Thumbnail - Background
const cdThumb = $('.cd-thumb')
// Controller
const repeatBtn = $('.btn.btn-repeat')
const prevBtn = $('.btn.btn-prev')
const toggle_playBtn = $('.btn.btn-toggle-play')
const nextBtn = $('.btn.btn-next')
const randomBtn = $('.btn.btn-random')


console.log([cdThumb])


function startApp() {
    init()
}

function init() {
    header.innerText = defaultSong.music
    cdThumb.style.backgroundImage = `url('${defaultSong.imgUrl}')`
}

function render() {

}

startApp()


