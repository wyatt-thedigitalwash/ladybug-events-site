import EventCard from "./EventCard";
import OpenEventNote from "./OpenEventNote";
import RsvpButton from "./RsvpButton";
import { communityEvents } from "@/lib/site";

export default function CommunityRsvp({
  initialEvent,
}: {
  initialEvent?: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {communityEvents.map((event) => (
        <EventCard
          key={event.name}
          name={event.name}
          cadence={event.cadence}
          time={event.time}
          headingLevel={2}
          action={
            event.rsvpRequired ? (
              <RsvpButton
                name={event.name}
                cadence={event.cadence}
                time={event.time}
                schedule={event.schedule}
                // A link such as /community?event=Bingo opens that form on arrival.
                autoOpen={initialEvent === event.name}
              />
            ) : (
              <OpenEventNote link={"link" in event ? event.link : undefined} />
            )
          }
        />
      ))}
    </div>
  );
}
