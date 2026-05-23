import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Trash2, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ItineraryCard({ itinerary, onDelete }) {
  const navigate = useNavigate();

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/shared/${itinerary.shareToken}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(itinerary._id);
  };

  return (
    <div
      onClick={() => navigate(`/itinerary/${itinerary._id}`)}
      className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight">{itinerary.title}</h3>
        <div className="flex gap-2 ml-2">
          <button onClick={handleShare} className="text-gray-400 hover:text-blue-500 transition-colors">
            <Share2 size={16} />
          </button>
          <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {itinerary.destination && (
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <MapPin size={14} />
          <span>{itinerary.destination}</span>
        </div>
      )}
      {itinerary.startDate && (
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <Calendar size={14} />
          <span>{itinerary.startDate} → {itinerary.endDate}</span>
        </div>
      )}
      <p className="text-gray-500 text-sm line-clamp-2">{itinerary.summary}</p>
      <div className="mt-3 text-xs text-gray-400">
        {itinerary.days?.length} day{itinerary.days?.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}