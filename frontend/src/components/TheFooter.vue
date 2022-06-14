<template>
    <footer class="footer">
        <div class="footer__content">
            <div class="img-wrapper">
                <img src="src/assets/icon-left-font-monochrome-white.svg" alt="logo Groupomania" />
            </div>
            <p class="footer-mention">Since 2022</p>
        </div>
    </footer>

</template>

<style scoped>
.footer {
    position: relative;
    box-shadow: 2px -5px 5px rgba(0, 0, 0, 0.5);
    background: var(--tertiary-clr);
}
.footer__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .6rem;
}

.img-wrapper {
    max-width: 40%;
}

.footer-mention {
    font-size: .6rem;
    font-weight: 600;
    color: var(--secondary-clr);
}

@media (min-width: 600px) {
    .img-wrapper {
        max-width: 15%;
    }
}

</style>