import Navbar from "../components/Navbar";

function Settings() {

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-bold mb-12">
          Settings ⚙️
        </h1>

        <div className="bg-gray-900 rounded-3xl p-10 space-y-8">

          {/* Theme */}
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-semibold">
                Dark Mode
              </h2>

              <p className="text-gray-400 mt-2">
                Enable dark theme appearance
              </p>

            </div>

            <button className="bg-blue-600 px-6 py-3 rounded-xl">
              Enabled
            </button>

          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-semibold">
                Notifications
              </h2>

              <p className="text-gray-400 mt-2">
                Receive updates and alerts
              </p>

            </div>

            <button className="bg-blue-600 px-6 py-3 rounded-xl">
              ON
            </button>

          </div>

          {/* Password */}
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-semibold">
                Change Password
              </h2>

              <p className="text-gray-400 mt-2">
                Update your account password
              </p>

            </div>

            <button className="bg-red-600 px-6 py-3 rounded-xl">
              Change
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;