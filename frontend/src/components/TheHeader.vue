<template>
    <header class="header">
        <div class="header__content">
            <router-link to="/" class="header__img-wrapper">
                <img src="src/assets/icon-left-font-monochrome-white.svg" alt="logo Groupomania" />
            </router-link>
            <p class="header__mention">Votre réseau social d'entreprise</p>
        </div>
    </header>
</template>

<style scoped>
.header {
    position: relative;
    box-shadow: 2px 8px 5px rgba(0, 0, 0, 0.5);
    background: linear-gradient(var(--primary-clr) 30%, var(--tertiary-clr) 70%);
}

.header__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .4rem;
}

.header__img-wrapper {
    max-width: 70%;
}

.header__mention {
    font-size: .7em;
    font-weight: 600;
    color: var(--secondary-clr);
    margin-bottom: .1rem;
}
</style>