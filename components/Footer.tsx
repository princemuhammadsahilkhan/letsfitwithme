export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EFEFEF] py-8 text-center">
      <p className="text-[#767676] text-sm">
        &copy; {new Date().getFullYear()} letsfitWith.me. All rights reserved.
      </p>
    </footer>
  );
}
