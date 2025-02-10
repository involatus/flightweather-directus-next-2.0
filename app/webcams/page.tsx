import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

async function getWebcams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      `,
    }),
  });

  const json = await res.json();
  return json.data?.webcams || [];
}

export default async function WebcamsPage() {
  const webcams = await getWebcams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-2">Webcams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {webcams.map((webcam) => (
          <Link href={webcam.url} key={webcam.id} target="_blank">
            <Card key={webcam.id} className="overflow-hidden">
              <CardContent className="p-2">
                {webcam.url && (
                  <div className="mb-2">
                    <img
                      src={"https://backend.roundshot.com/cams/"
                        .concat(webcam.id_key)
                        .concat("/thumbnail")}
                      alt={webcam.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <CardTitle className="float-left text-md">
                    {webcam.name}
                  </CardTitle>
                  <div className="float-right text-xs">
                    Tags:
                    {webcam.tags &&
                      webcam.tags.map((tag) => (
                        <a href="#" key={tag}>
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        </a>
                      ))}
                  </div>
                  {typeof webcam.tags === "string" &&
                    webcam.tags.split(",").map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag.trim()}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
