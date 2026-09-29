import '../assets/stylesheets/admin.css';

export default function Screen({ children }) {
  return (
      <main className={`admin-screen`}>
        <div className="content">
            {children}
        </div>
      </main>
  );
}
