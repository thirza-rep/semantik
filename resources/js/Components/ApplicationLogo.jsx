export default function ApplicationLogo({ className }) {
    return (
        <img
            src="/BinaInsan.png"
            alt="Bina Insan"
            className={className}
            style={{
                zoom: 1.5,
                border: '2px solid white',
                borderRadius: '10%',
            }}
        />
        
    );
}
