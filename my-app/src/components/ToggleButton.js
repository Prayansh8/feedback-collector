export default function ToggleButton({ onClick, showAdmin }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
      >
        {showAdmin ? "Back to Form" : "View Submitted Feedback"}
      </button>
    );
  }
  