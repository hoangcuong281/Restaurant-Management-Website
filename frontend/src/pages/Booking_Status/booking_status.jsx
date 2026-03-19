function Booking_Status(status) {
  return (
    <section className="py-10 flex justify-center bg-[var(--Shiro)]">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 p-8 rounded-lg">
        <p className="text-center text-4xl font-bold mb-8 text-[var(--Aka)]">TOKYO BITES</p>

        {status && (
          <div className="text-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-green-500 mx-auto flex items-center justify-center text-white text-6xl">✔</div>
            <div className="text-2xl font-semibold text-green-600">Đặt bàn thành công!</div>
            <div>
              <button onClick={() => window.location.href = '/menu'} className="mt-4 bg-[var(--Aka)] text-[var(--Shiro)] px-6 py-3 rounded-lg font-bold hover:bg-red-600">Review Menu</button>
            </div>
          </div>
        )}

        {!status && (
          <div className="text-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-[var(--Aka)] mx-auto flex items-center justify-center text-white text-6xl">!</div>
            <div className="text-2xl font-semibold text-[var(--Aka)]">Đặt bàn không thành công</div>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={() => window.location.href = '/contact'} className="bg-[var(--Aka)] text-[var(--Shiro)] px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[var(--Aka)] border-2 border-[var(--Aka)]">Liên hệ</button>
              <button onClick={() => window.location.href = '/tablebooking'} className="bg-[var(--Aka)] text-[var(--Shiro)] px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[var(--Aka)] border-2 border-[var(--Aka)]">Thử lại</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Booking_Status