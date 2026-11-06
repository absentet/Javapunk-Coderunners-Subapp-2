function Layout({ children, blurred = true }) {
    return (
        <div>
            <div className={blurred ? "bg bg-blur" : "bg"}></div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Layout;