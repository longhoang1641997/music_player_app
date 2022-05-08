const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const imgUrlBase = './assets/img-song/'
const musicUrlBase = './assets/music/'

// Header
const header = $('h2')
// CD
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const cdWidth = cd.offsetWidth
const cdThumbAnimation = cdThumb.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 10000,
    iterations: Infinity
})
cdThumbAnimation.pause()
// Controller
const repeatBtn = $('.btn.btn-repeat')
const prevBtn = $('.btn.btn-prev')
const toggle_playBtn = $('.btn.btn-toggle-play')
const nextBtn = $('.btn.btn-next')
const randomBtn = $('.btn.btn-random')
const playback = $('.icon-pause')
const pausePlayBack = $('.icon-play')
// Progress
const progress = $('#progress')
console.log([progress])

const hoverElements = [repeatBtn, prevBtn, toggle_playBtn, nextBtn, randomBtn]
// Playlist
const songList = $('.playlist')
// Audio Element
const audioElement = $('#audio')
console.log([audioElement])

const music_player_app =
{
    songs: [
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
    ],

    isShuffle: false,
    isPlaying: false,

    start() {
        this.init()
        this.renderSongs()
        this.initEventHandler()
        this.updatePlaylistInfo(0)
    },
    init() {
        const defaultSong = this.getDefaultSong()
        this.updateInfoSong(defaultSong)
        audioElement.src = defaultSong.srcUrl
    },
    getDefaultSong() {
        return this.songs[0]
    },
    renderSongs() {
        const htmls = this.songs.map((song,idx) => {
            return `
            <div class="song", data-idSong="${idx}">
                <div class="thumb" style="background-image: url('${song.imgUrl}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.music}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        songList.innerHTML = htmls.join('')
    },
    initEventHandler() {
        // Controller
        repeatBtn.onclick = () => {
            console.log('[ONCLICK] Repeat Button')
            this.handleRepeat()
        }
        prevBtn.onclick = () => {
            console.log('[ONCLICK] Previous Button')
            if(this.isShuffle)
            {
                this.handleShuffle()
            } 
            else {
                this.handlePrevious()
            }
        }
        toggle_playBtn.onclick = () => {
            console.log('[ONCLICK] Play/Pause Button')
            this.handlePlay_Pause()

        }
        nextBtn.onclick = () => {
            console.log('[ONCLICK] Next Button')
            if (this.isShuffle) {
                this.handleShuffle()
            }
            else {
                this.handleNext()
            }
        }
        randomBtn.onclick = () => {
            this.isShuffle = !this.isShuffle
            console.log('[ONCLICK] Shuffle Button isShuffle:', this.isShuffle)
            if(this.isShuffle){
                randomBtn.classList.add('active')
            }
            else{
                randomBtn.classList.remove('active')
            }
        }
        // Playlist
        songList.onclick = (e) => {
            if (e.target.closest('.song')) {
                const idxSelectSong = Number(e.target.closest('.song').dataset.idsong)
                const selectSong = this.songs[idxSelectSong]
                audioElement.src = selectSong.srcUrl
                if (this.isPlaying === false) {
                    this.isPlaying = true
                    this.changeStatePlayBack(this.isPlaying)
                }
                this.updateInfoSong(selectSong)
                this.updatePlaylistInfo(idxSelectSong)
                audioElement.play()
            }
        }
        // End song next new song
        audioElement.onended = () => {
            console.log('Notify End Playlist')
            if (this.isShuffle) {
                this.handleShuffle()
            }
            else {
                this.handleNext()
            }
        }
        // Hover Feature
        hoverElements.forEach(element => {
            element.onmouseenter = (e) => {
                e.target.classList.add('hover')
            }
            element.onmouseleave = (e) => {
                e.target.classList.remove('hover')
            }
        })
        // Scrolling
        document.onscroll = () => {
            const scrollTop = window.scrollY
            const newcdWidth = cdWidth - scrollTop
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0  
            cd.style.opacity = newcdWidth/cdWidth
        }
        //Progress
        audioElement.ontimeupdate = () => {
            if(audioElement.duration) {
                const percent = Math.floor((audioElement.currentTime/audioElement.duration)*100) 
                progress.value = percent
            }
        }
        progress.onchange = () => {
            if (this.isPlaying === false) {
                audioElement.currentTime = Math.floor((progress.value / 100) * audioElement.duration)
                this.isPlaying = true
                this.changeStatePlayBack(this.isPlaying)
                audioElement.play()
            }
        }
    },
    updateInfoSong(song) {
        console.log(song.imgUrl, song.music)
        header.textContent = song.music
        cdThumb.style.backgroundImage = `url('${song.imgUrl}')`
    },
    updatePlaylistInfo(idxCurrentSong) {
        this.renderSongs()
        const playList = this.getPlayList()
        playList[idxCurrentSong].classList.add('active')
    },
    getPlayList() {
        let songElements = $$('.song')
        songElements = [...songElements]
        return songElements
    },
    changeStatePlayBack(isPlaying) {
        if (isPlaying) {
            playback.style.display = 'inline-block'
            pausePlayBack.style.display = 'none'
        }
        else {
            playback.style.display = 'none'
            pausePlayBack.style.display = 'inline-block'
        }
    },
    // Handle All Action Media Controller
    handleRepeat() {
        audioElement.currentTime = 0
    },
    handlePrevious() {
        // The same handleNext
        const currentSrcSong = audioElement.currentSrc
        let patternSong = '.' + currentSrcSong.slice(21)
        patternSong = patternSong.replaceAll('%20', ' ')
        let idxCurrentSong = this.songs.findIndex((song) => {
            return song.srcUrl === patternSong
        })
        idxCurrentSong -= 1
        if (idxCurrentSong === -1) {
            const lastSong = this.songs[this.songs.length - 1]
            audioElement.src = lastSong.srcUrl
            this.updateInfoSong(lastSong)
            this.updatePlaylistInfo(this.songs.length - 1)
        }
        else {
            console.log('idxCurrentSong: ', idxCurrentSong)
            audioElement.src = this.songs[idxCurrentSong].srcUrl
            console.log('CurrentSource: ', audioElement.currentSrc)
            this.updateInfoSong(this.songs[idxCurrentSong])
            this.updatePlaylistInfo(idxCurrentSong)
        }

        if (this.isPlaying === false) {
            this.isPlaying = true
            this.changeStatePlayBack(this.isPlaying)
        }
        audioElement.play()
    },
    handlePlay_Pause() {

        cdThumbAnimation.pause()
        if (this.isPlaying) {
            console.log('Current source is playing, so need to pause playback')
            cdThumbAnimation.pause()
            audioElement.pause()
            this.isPlaying = false
        }
        else {
            audioElement.play()
            this.isPlaying = true
            cdThumbAnimation.play()
        }
        this.changeStatePlayBack(this.isPlaying)
    },
    handleNext() {
        const currentSrcSong = audioElement.currentSrc
        let patternSong = '.' + currentSrcSong.slice(21)
        console.log(patternSong)
        patternSong = patternSong.replaceAll('%20', ' ')
        console.log(patternSong)
        let idxCurrentSong = this.songs.findIndex((song) => {
            return song.srcUrl === patternSong
        })
        console.log('idxCurrentSong: ', idxCurrentSong)
        if (idxCurrentSong === -1 || idxCurrentSong === this.songs.length - 1) {
            audioElement.src = defaultSong.srcUrl
            this.updateInfoSong(defaultSong)
            this.updatePlaylistInfo(0)
        }
        else {
            idxCurrentSong += 1
            audioElement.src = this.songs[idxCurrentSong].srcUrl
            this.updateInfoSong(this.songs[idxCurrentSong])
            this.updatePlaylistInfo(idxCurrentSong)
            console.log('CurrentSource: ', audioElement.currentSrc)
        }

        if (this.isPlaying === false) {
            this.isPlaying = true
            this.changeStatePlayBack(this.isPlaying)
        }
        audioElement.play()
    },
    handleShuffle() {
        const idxRandomSong = Math.floor(Math.random() * this.songs.length)
        const randomSong = this.songs[idxRandomSong]
        audioElement.src = randomSong.srcUrl
        if(this.isPlaying === false) {
            this.isPlaying = true
            this.changeStatePlayBack(this.isPlaying)
        }
        audioElement.play()
        this.updateInfoSong(randomSong)
        this.updatePlaylistInfo(idxRandomSong)
    },
    getCdRotation() {

        cdThumbAnimation.pause()
        return cdThumbAnimation
    }


}

music_player_app.start()