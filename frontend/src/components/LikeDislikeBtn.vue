<template>
    <div class="container">
        <div class="content">
            <i @click="clickLike" :class="{ 'like': likeClicked }" class="fas fa-thumbs-up"></i>
            <span>{{ likesCount }}</span>
        </div>
        <div class="content">
            <i @click="clickDislike" :class="{ 'dislike': dislikeClicked }" class="fas fa-thumbs-down"></i>
            <span>{{ dislikesCount }}</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            likesCount: this.post.likes,
            dislikesCount: this.post.dislikes,
            likeClicked: this.post.usersLiked.includes(this.$store.getters.user),
            dislikeClicked: this.post.usersDisliked.includes(this.$store.getters.user),
        }
    },
    props: {
        post: { type: Object, required: true }
    },
    methods: {
        clickLike() {
            this.likeClicked = !this.likeClicked
            if (this.likeClicked) {
                if (this.dislikeClicked) {
                    this.dislikesCount--
                    this.dislikeClicked = !this.dislikeClicked
                }
                this.likesCount++
            } else {
                this.likesCount--
            }
            this.setLike()
        },
        clickDislike() {
            this.dislikeClicked = !this.dislikeClicked
            if (this.dislikeClicked) {
                if (this.likeClicked) {
                    this.likesCount--
                    this.likeClicked = !this.likeClicked
                }
                this.dislikesCount++
            } else {
                this.dislikesCount--
            }
            this.setLike()
        },
        setLike() {
            const like = this.likeClicked ? 1 : this.dislikeClicked ? -1 : 0
            axios.post('posts/like/' + this.post._id, {
                like: like,
                user: this.$store.getters.user
            })
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    gap: .5rem;
}

span {
    margin-left: .1rem;
}

.fa-thumbs-down {
    position: relative;
    top: .23rem
}

.like,
.fa-thumbs-up:hover {
    color: rgb(0, 238, 255);
}

.dislike,
.fa-thumbs-down:hover {
    color: red;
}
</style>