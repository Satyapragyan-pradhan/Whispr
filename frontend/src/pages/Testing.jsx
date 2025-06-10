function Testing() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Theme Preview</h2>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Chat Message</h3>
          <p>Hello! This is a test message inside the current theme.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testing;
