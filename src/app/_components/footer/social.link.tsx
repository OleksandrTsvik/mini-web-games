type Props = {
  href: string;
  icon: React.ReactNode;
  screenReader?: string;
};

export default function SocialLink({ href, icon, screenReader }: Props) {
  return (
    <a
      href={href}
      className="hover:text-zinc-700"
      target="_blank"
    >
      {screenReader && <span className="sr-only">{screenReader}</span>}
      {icon}
    </a>
  );
}
