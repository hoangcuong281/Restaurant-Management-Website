function DetailMenu() {
    return (
        <section className="w-full flex items-center justify-center text-[var(--Shiro)]">
            <div className="w-full max-w-6xl flex flex-col items-center">
                <h2 className="mb-6 text-3xl md:text-4xl font-bold text-[var(--Kuro)]" style={{fontFamily: 'var(--font-heading)'}}>Thực đơn</h2>

                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 px-4">
                    <div className="flex flex-col items-center justify-between p-8 rounded-[20px] bg-[var(--Aka)] m-2 w-full md:w-1/3 min-w-[220px] h-69 text-center box-border">
                        <div className="font-bold text-3xl" style={{fontFamily: 'var(--font-heading)'}}>Món ăn</div>
                        <div className="text-xl text-[var(--Shiro)] mt-1">Tất cả món ăn đều được chế biến tươi mới ngay tại nhà hàng mỗi ngày</div>
                        <a href="/menu" className="mt-1 inline-block bg-[var(--Kuro)] text-[var(--Shiro)] px-4 py-2 rounded font-bold text-lg">Xem thực đơn</a>
                    </div>

                    <div className="flex flex-col items-center justify-between p-8 rounded-[20px] bg-[var(--Aka)] m-2 w-full md:w-1/3 min-w-[220px] h-69 text-center box-border">
                        <div className="font-bold text-3xl" style={{fontFamily: 'var(--font-heading)'}}>Thành phần</div>
                        <div className="text-xl text-[var(--Shiro)] mt-1">Thành phần và nguyên liệu tươi sạch, tuyển chọn kỹ lưỡng</div>
                        <a href="https://docs.google.com/document/d/1LXjEXNuWk6ePNtN8M93cWlOe_Zpoj3CsoN773O37KTw/edit?usp=sharing" className="mt-1 inline-block bg-[var(--Kuro)] text-[var(--Shiro)] px-4 py-2 rounded font-bold text-lg">Xem thành phần</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailMenu;