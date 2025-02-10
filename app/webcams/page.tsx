import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getWebcams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query Webcams {
          webcams {
            id
            name
            url
            id_key
            tags
          }
        }
      `
    }),
  });

  const json = await res.json();
  return json.data?.webcams || [];
}

export default async function WebcamsPage() {
  const webcams = await getWebcams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Webcams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webcams.map((webcam) => (
          <Card key={webcam.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{webcam.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {webcam.url && (
                <div className="aspect-video relative mb-4">
                  <img
                    src={"https://backend.roundshot.com/cams/".concat(webcam.id_key).concat("/thumbnail")}
                    alt={webcam.name}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {typeof webcam.tags === 'string' && webcam.tags.split(',').map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}