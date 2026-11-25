type Props = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

export default function MediaPlaceholder({ src, alt, label, className = "" }: Props) {
  return (
    <figure className={`media-placeholder ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.parentElement?.classList.add("is-empty");
        }}
      />
      <div className="media-empty">
        <span className="media-cross">✳</span>
        <span>{label}</span>
        <small>ADD YOUR GAMEPLAY IMAGE OR VIDEO</small>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
