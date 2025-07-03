const Footer = () => {
    return (
        <>
            <footer className="fixed bottom-0 left-0 w-full bg-pink-400 py-5 z-10" data-cy="app-footer">
                <p className="text-white text-center font-light text-sm sm:text-base">Desenvolvido com 🤍 por <a href="https://github.com/DanielyVasconcelos2024" target="_blank" className="underline" data-cy="daniely-github-link">Daniely</a> & <a href="https://github.com/alvesmariadefatima" target="_blank" className="underline" data-cy="fatima-github-link">Maria de Fátima</a></p>
            </footer>
        </>
    )
}

export default Footer;