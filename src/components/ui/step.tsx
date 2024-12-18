export default function Step({
  number,
  text,
}: {
  number: number | string;
  text: string;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
        {number}
      </div>
      <p className="text-lg">{text}</p>
    </div>
  );
}
