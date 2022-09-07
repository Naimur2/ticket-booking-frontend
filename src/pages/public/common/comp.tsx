export const DecrptionTab = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="d-flex ">
            <h6 className="pe-4">{title}</h6>
            <p>{description}</p>
        </div>
    );
};

export const Location = ({ coachD, title }: { coachD: any; title: string }) => (
    <div className="mb-4 card py-3 px-4">
        <h3 className="pb-2">{title}</h3>

        {coachD?.name && (
            <DecrptionTab title="Name" description={coachD?.name} />
        )}
        {coachD?.address && (
            <DecrptionTab title="Address" description={coachD?.address} />
        )}

        {coachD?.description && (
            <DecrptionTab
                title="Description"
                description={coachD?.description}
            />
        )}
        {coachD?.phone && (
            <DecrptionTab title="Phone" description={coachD?.phone} />
        )}

        {coachD?.email && (
            <DecrptionTab title="Email" description={coachD?.email} />
        )}
    </div>
);

export const BusDetails = ({ bus }) => (
    <div className="card py-2 px-4">
        <h3 className="pt-4 pb-2">Bus Details</h3>

        {bus?.busName && (
            <DecrptionTab title="Bus name" description={bus.busName} />
        )}
        {bus?.busLiscenseNumber && (
            <DecrptionTab
                title="Liscence Number"
                description={bus.busLiscenseNumber}
            />
        )}
        {bus?.busDescription && (
            <DecrptionTab
                title="Bus Description"
                description={bus.busDescription}
            />
        )}
        {bus?.busType && (
            <DecrptionTab title="Bus Type" description={bus.busType} />
        )}
        {bus?.busType && (
            <DecrptionTab
                title="Number of Seats"
                description={bus.seatNumber}
            />
        )}
        {/* {bus?.busImage && (
            <div className="d-flex align-items-center">
                <h6 className="pb-2">Bus Image</h6>
                <img
                    height={100}
                    width={100}
                    src={bus.busImage}
                    alt="busImage"
                />
            </div>
        )} */}
    </div>
);
