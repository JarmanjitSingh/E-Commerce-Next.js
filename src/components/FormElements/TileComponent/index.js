export default function TileComponent({ data, selected = [], onclick }) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap gap-1 items-center">
      {data.map((dataItem) => (
        <label key={dataItem.id} className="cursor-pointer">
          <span className="rounded-lg border border-black px-6 py-2 font-bold">
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
