const AboutPageStyle = (): JSX.Element => (
  <style>{`
main h2 {
    color: var(--primary);
    filter: brightness(130%);
}

.hero-image {
    margin-top: -8px;
    margin-left: -66px;
}

.hero-image img {
    transform: scale(0.66);
}

.hero-subtitle {
    font-size: 0 !important;
}

@media (min-width: 768px) {
    .hero-image {
        margin-top: 32px;
        margin-left: -88px !important;
    }
    .hero-image img {
        transform: scale(0.75);
    }
}

@media (min-width: 1024px) {
    .hero-image {
        margin-top: 0;
        margin-left: -108px;
        margin-left: -108px;
    }
    .hero-image img {
        transform: unset;
}

    .hero-title {
        margin-top: 1px;
        font-size: 64px !important;
    }

}
`}</style>
)

export default AboutPageStyle
