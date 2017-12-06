// The scaffold of the data content
import '@progress/kendo-ui/js/kendo.all.js';

var documents = [
    {
        "id": "9b225be4-c4a7-4774-8b96-500638c868f1",
        "title":"Name of document",
        "type": "pdf",
        "created": "1467377221",
        "modified": "1512107881",
        "tag": "9SO", // Document Tag - Refence number
        "version": "b458b23f-b187-4948-8702-4536ec751e14",
        "labels": [
            "Documentation",
            "Specifications",
            "Customer Service"
        ],
        "versions": [
            {
                "id": "96ee10d5-eb9a-4068-a3a3-24da170c97d6",
                "created": "1467377221",
                "order": 1,
                "title": "Version 1",
                "description": "Full text description of the version",
            },
            {
                "id": "c56ad8b2-0826-4604-bc94-f6ba9b89098f",
                "created": "1470055621",
                "order": 2,
                "title": "Version 2",
                "description": "Full text description of the version",
            },
            {
                "id": "870ed8fd-a701-45e2-bec8-32b94d952c44",
                "created": "1470660421",
                "order": 3,
                "title": "Version 3",
                "description": "Full text description of the version",
            },
            {
                "id": "b458b23f-b187-4948-8702-4536ec751e14",
                "created": "1512107881",
                "order": 4,
                "title": "Version 4",
                "description": "Full text description of the version",
            },

        ]
    },
    {
        "id": "d82b3af6-5bf7-4b05-848b-aa74395bc667",
        "title":"Primary parts documentation",
        "type": "xls",
        "created": "1467377221",
        "modified": "1470055621",
        "tag": "QB3", // Document Tag
        "labels": [
            "Documentation",
            "Instruction Sheet",
            "Operators",
            "Extranet"
        ],
        "version": "b458b23f-b187-4948-8702-4536ec751e14",
        "versions": [
            {
                "id": "6120c582-467d-4218-b7f1-b2f94a760eab",
                "created": "1467377221",
                "order": 1,
                "title": "Version 1",
                "description": "Full text description of the version",
            },
            {
                "id": "f6d41fde-4aed-4ef8-ae8c-3395cc88a0e6",
                "created": "1470055621",
                "order": 2,
                "title": "Version 2",
                "description": "Full text description of the version",
            },
        ]
    }
];

const documentsDS = new kendo.data.DataSource({data: documents});
console.log(documentsDS);
