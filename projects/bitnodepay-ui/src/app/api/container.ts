export interface Container {
    Id: string,
    Names: string[],
    Image: string,
    ImageID: string,
    Command: string,
    Created: number,
    Ports: [],
    Labels: {},
    State: string,
    Status: string,
    HostConfig: {},
    NetworkSettings: {
        Networks: {
            bridge: {
                IPAMConfig: string,
                Links: string,
                Aliases: string,
                NetworkID: string,
                EndpointID: string,
                Gateway: string,
                IPAddress: string,
                IPPrefixLen: number,
                IPv6Gateway: string,
                GlobalIPv6Address: string,
                GlobalIPv6PrefixLen: null,
                MacAddress: string,
                DriverOpts: string
            }
        }
    },
    Mounts: [
        {
            Type: string,
            Source:string,
            Destination: string,
            Mode: string,
            RW: boolean,
            Propagation: string
        }
    ]
}

export const ContainerSampleJSON = [
    {
        "Id": "5c6eecc37462aea1efc9f372b9366232c8d5209ceabd24b626aa07d59c6d7d57",
        "Names": [
            "/sleepy_hawking"
        ],
        "Image": "bitnodepay-service",
        "ImageID": "sha256:54ddced6249c7613250fae898da165b36876226e8acc2d2766cadfbb2b015d04",
        "Command": "docker-entrypoint.sh /bin/sh -c 'node /src/bin/www'",
        "Created": 1696439860,
        "Ports": [],
        "Labels": {
            "desktop.docker.io/binds/0/Source": "/var/run/docker.sock",
            "desktop.docker.io/binds/0/SourceKind": "dockerSocketProxied",
            "desktop.docker.io/binds/0/Target": "/var/run/docker.sock"
        },
        "State": "exited",
        "Status": "Exited (137) 2 hours ago",
        "HostConfig": {
            "NetworkMode": "default"
        },
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "2d83879aa91045fc8bc594f598c5723548580a8d91f180d72f6a1a8a728e8e1c",
                    "EndpointID": "",
                    "Gateway": "",
                    "IPAddress": "",
                    "IPPrefixLen": 0,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "",
                    "DriverOpts": null
                }
            }
        },
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/run/host-services/docker.proxy.sock",
                "Destination": "/var/run/docker.sock",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ]
    },
    {
        "Id": "409b1272e67a51f1424b2d4295e3de4841b77a8f2b7ba61234110472680ef11a",
        "Names": [
            "/optimistic_diffie"
        ],
        "Image": "bitnodepay:v0.1.0",
        "ImageID": "sha256:97b9ef011601808d7622747c04874992a77e4131e23eb9f057be77b1739fd46e",
        "Command": "/docker-entrypoint.sh nginx -g 'daemon off;'",
        "Created": 1696365412,
        "Ports": [
            {
                "PrivatePort": 80,
                "Type": "tcp"
            },
            {
                "IP": "0.0.0.0",
                "PrivatePort": 8080,
                "PublicPort": 80,
                "Type": "tcp"
            }
        ],
        "Labels": {
            "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
        },
        "State": "exited",
        "Status": "Exited (255) 4 hours ago",
        "HostConfig": {
            "NetworkMode": "default"
        },
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "d4df00894d233977ec7c522df475b614f440eff2d64b17df1cf4d875b55ba65e",
                    "EndpointID": "cf84716e4dbee54092bede758d71eae3cb481303308aa94c46d251ae4842021e",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        },
        "Mounts": []
    }
]
