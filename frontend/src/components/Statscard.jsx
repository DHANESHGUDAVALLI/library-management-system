function StatsCard({ title, value }) {
  return (

    <div className="bg-gray-900 p-6 rounded-3xl hover:scale-105 transition duration-300 shadow-lg">

      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold text-white mt-4">
        {value}
      </p>

    </div>
  );
}

export default StatsCard;