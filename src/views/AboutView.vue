<template>
    <div style="height: auto;">
        <h1>成員</h1>
        <div id="content">
            <div class="member_card ZH">
                <div class="outer_img">
                    <img src="https://d1fdloi71mui9q.cloudfront.net/5XSAbmsQuyvP5OSgCM2P_2242C6D7-B5A4-41E0-B8CD-0A70440C281D.jpeg"
                        alt="成員 德龍｜Instagram Link Thumbnail | Origin">
                    <h2 class="ZH">德龍</h2>
                </div>
                <div>
                    <a class="anchor ENG pointer"
                        href="https://instagram.com/derlongchen_performing_tw?utm_medium=copy_link">
                        <img src="@/assets/media/instagram.svg">Instagram
                    </a>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque nam totam ratione, eligendi
                        ducimus
                        unde aut itaque, consequuntur laudantium officia esse qui quam temporibus rem dolorum debitis
                        fugiat
                        tempore omnis!
                    </div>
                </div>
            </div>
            <div class="member_card ZH">
                <div class="outer_img">
                    <img src="https://d1fdloi71mui9q.cloudfront.net/T8Pe1fdzRT6YC0cTHhDE_2CA641F7-AC7E-44A7-B4F2-B97FF4C34CAD.jpeg"
                        alt="成員 馬德｜Instagram Link Thumbnail | Origin">
                    <h2 class="ZH">馬德</h2>
                </div>
                <div>
                    <a class="anchor ENG pointer" href="https://instagram.com/de_lun_ma?utm_medium=copy_link">
                        <img src="@/assets/media/instagram.svg">Instagram
                    </a>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque nam totam ratione, eligendi
                        ducimus
                        unde aut itaque, consequuntur laudantium officia esse qui quam temporibus rem dolorum debitis
                        fugiat
                        tempore omnis!
                    </div>
                </div>
            </div>
            <div class="member_card ZH">
                <div class="outer_img">
                    <img src="https://d1fdloi71mui9q.cloudfront.net/ikLP18TuRm6tWLExAuei_726B86D8-8454-4273-8647-0010021F3316.png"
                        alt="成員 峻溢｜Instagram Link Thumbnail | Origin">
                    <h2 class="ZH">峻溢</h2>
                </div>
                <div>
                    <a class="anchor ENG pointer" href="https://instagram.com/greenfire_nv07?utm_medium=copy_link">
                        <img src="@/assets/media/instagram.svg">Instagram
                    </a>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque nam totam ratione, eligendi
                        ducimus
                        unde aut itaque, consequuntur laudantium officia esse qui quam temporibus rem dolorum debitis
                        fugiat
                        tempore omnis!
                    </div>
                </div>
            </div>
            <div class="member_card ZH">
                <div class="outer_img">
                    <img src="https://d1fdloi71mui9q.cloudfront.net/kHVdJhvSIOyqlhGQfWVm_A5F85CF1-9E71-4CB0-958E-A0120C0BA4A2.png"
                        alt="成員 海默｜Instagram Link Thumbnail | Origin">
                    <h2 class="ZH">海默</h2>
                </div>
                <div>
                    <a class="anchor ENG pointer" href="https://instagram.com/roam_in_the_fire?utm_medium=copy_link">
                        <img src="@/assets/media/instagram.svg">Instagram
                    </a>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque nam totam ratione, eligendi
                        ducimus
                        unde aut itaque, consequuntur laudantium officia esse qui quam temporibus rem dolorum debitis
                        fugiat
                        tempore omnis!
                    </div>
                </div>
            </div>
            <div class="member_card ZH">
                <div class="outer_img">
                    <img src="https://d1fdloi71mui9q.cloudfront.net/7ruZnfhtQWdrZpq33E0I_1721476E-4351-495F-BBE4-B94E30A4C9D2.png"
                        alt="成員 盜月｜Instagram Link Thumbnail | Origin">
                    <h2 class="ZH">盜月</h2>
                </div>
                <div>
                    <a class="anchor ENG pointer" href="https://instagram.com/pilfermoon?utm_medium=copy_link">
                        <img src="@/assets/media/instagram.svg">Instagram
                    </a>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque nam totam ratione, eligendi
                        ducimus
                        unde aut itaque, consequuntur laudantium officia esse qui quam temporibus rem dolorum debitis
                        fugiat
                        tempore omnis!
                    </div>
                </div>
            </div>
            <div class="member_card ZH">
                <div class="outer_img">
                    <img src="https://d1fdloi71mui9q.cloudfront.net/oFDDDQ9T8WEVEzSfPX9e_D4717E12-5F69-4FF7-8574-FCFAD27ECB7A.jpeg"
                        alt="成員 江鳥｜Instagram Link Thumbnail | Origin">
                    <h2 class="ZH">江鳥</h2>
                </div>
                <div>
                    <a class="anchor ENG pointer" href="https://instagram.com/yu_hong_fire?utm_medium=copy_link">
                        <img src="@/assets/media/instagram.svg">Instagram
                    </a>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque nam totam ratione, eligendi
                        ducimus
                        unde aut itaque, consequuntur laudantium officia esse qui quam temporibus rem dolorum debitis
                        fugiat
                        tempore omnis!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutView',
    data() {
        return {
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            document.querySelectorAll('.outer_img>img').forEach(img => {
                var rect = img.getBoundingClientRect()
                var center = 1 - ((rect.top + rect.height / 2 + document.documentElement.clientHeight / 2) / document.documentElement.clientHeight)
                var move = document.documentElement.clientWidth * 0.86 * 0.2 / 2 * -center
                img.style.transform = `translateY(${move}px)`
            })
        })
        document.body.classList.add('nav')
    }
}
</script>

<style src="@/assets/css/about.css" scoped>

</style>
